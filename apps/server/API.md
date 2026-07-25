# NIIT Food Delivery — API Reference

Base URL:
- Production: `https://niit-react-native-project-2026.onrender.com/api`
- Local dev: `http://localhost:5000/api`

Interactive docs (once deployed): `/api-docs` on either host above.

## Auth

Protected routes require a header:

```
Authorization: Bearer <jwt-token>
```

The token is returned by `POST /auth/register` or `POST /auth/login`, and carries `role` (`customer` | `chef` | `driver`). Routes marked **chef-only** or **driver-only** enforce that role via middleware, returning `403` for the wrong role.

Ownership-scoped routes (e.g. editing your own restaurant, viewing your own order) return `403` (wrong owner) or `404` (record not found / not yours) rather than leaking other users' data.

---

## Table of Contents

1. [Health](#health)
2. [Auth](#1-auth)
3. [Profile](#2-profile)
4. [Address](#3-address)
5. [Restaurants](#4-restaurants)
6. [Food](#5-food)
7. [Offers](#6-offers)
8. [Search](#7-search)
9. [Cart](#8-cart)
10. [Orders](#9-orders)
11. [Payments](#10-payments)
12. [Delivery](#11-delivery)
13. [Conversations](#12-conversations)
14. [Notifications](#13-notifications)
15. [Reviews](#14-reviews)
16. [Dashboard](#15-dashboard-chef-only)
17. [Real-time (Socket.io)](#real-time-socketio)
18. [Data Models](#data-models)

---

## Health

### `GET /health`
No auth. Returns `{ "status": "ok" }`. Use to check the server is up.

---

## 1. Auth
Base: `/api/auth`

### `POST /auth/register`
Create an account.

**Body**
| field | type | required |
|---|---|---|
| name | string | yes |
| email | string | yes |
| password | string | yes |
| role | `"customer"` \| `"chef"` \| `"driver"` | no (default `customer`) |

**Response `201`**
```json
{ "token": "...", "user": { "id": "...", "name": "...", "email": "...", "role": "customer" } }
```
**Errors**: `400` missing fields · `409` email already registered

### `POST /auth/login`
**Body**: `{ email, password }`
**Response `200`**: same shape as register.
**Errors**: `400` missing fields · `401` invalid credentials

### `GET /auth/me` 🔒
Returns the logged-in user (password excluded).
**Response `200`**: `{ "user": { ... } }`

---

## 2. Profile
Base: `/api/profile` — all routes 🔒

### `GET /profile`
Returns the current user's profile.

### `PUT /profile`
**Body** (all optional): `{ name, phone, bio, avatar, location: { lat, lng } }`
`avatar` is currently a plain URL string (no file upload endpoint yet).

---

## 3. Address
Base: `/api/address` — all routes 🔒

### `POST /address`
**Body**
| field | type | required |
|---|---|---|
| label | `"Home"` \| `"Work"` \| `"Other"` | no (default `Home`) |
| street | string | **yes** |
| apartment | string | no |
| postcode | string | no |
| lat, lng | number | no — auto-geocoded from `street`+`postcode` via OpenStreetMap if omitted |
| isDefault | boolean | no |

**Response `201`**: `{ "address": { ... } }`

### `GET /address`
List the current user's saved addresses.

### `GET /address/geocode?query=<text>`
Ad-hoc lookup (e.g. for a map-picker UI). Returns `{ "lat": number, "lng": number }` or `404` if nothing found.

### `GET /address/:id`
### `PUT /address/:id`
Same body shape as create, all fields optional.
### `DELETE /address/:id`

---

## 4. Restaurants
Base: `/api/restaurants`

### `POST /restaurants` 🔒 chef-only
**Body**: `{ name (required), description, cuisineTags: [string], banner, deliveryTime, freeShipping }`
**Response `201`**: `{ "restaurant": { ... } }`

### `GET /restaurants`
Public. Query: `?open=true` filters to `isOpen: true`. Sorted by rating desc.

### `GET /restaurants/mine` 🔒 chef-only
Returns the calling chef's own restaurant.

### `GET /restaurants/:id`
Public. **Response**: `{ "restaurant": { ... }, "foods": [ ... ] }`

### `PUT /restaurants/:id` 🔒 chef-only, owner
**Body** (all optional): `{ name, description, cuisineTags, banner, deliveryTime, freeShipping, isOpen }`

### `DELETE /restaurants/:id` 🔒 chef-only, owner
Also deletes all of that restaurant's food items.

---

## 5. Food
Base: `/api/food`

### `POST /food` 🔒 chef-only, must own the restaurant
**Body**
| field | type | required |
|---|---|---|
| restaurantId | string | yes |
| name | string | yes |
| price | number | yes |
| category | string | no |
| ingredients | [string] | no |
| description | string | no |
| sizes | `[{ label, price }]` | no |
| image | string (URL) | no |

### `GET /food`
Public. Query: `?restaurant=<id>&category=<text>&popular=true`

### `GET /food/:id`
Public.

### `PUT /food/:id` 🔒 chef-only, owner of the food's restaurant
**Body** (optional): `{ name, price, category, ingredients, description, sizes, image, isPopular }`

### `DELETE /food/:id` 🔒 chef-only, owner

---

## 6. Offers
Base: `/api/offers`

### `POST /offers` 🔒 chef-only
**Body**: `{ restaurantId (optional — omit for a platform-wide offer), code (required, unique), discountPercent (required), description, expiresAt }`

### `GET /offers`
Public. Only returns currently active, non-expired offers.

### `DELETE /offers/:id` 🔒 chef-only, owner (if tied to a restaurant)

---

## 7. Search
Base: `/api/search` — all public

### `GET /search?q=<keyword>`
Case-insensitive match across restaurant name/description and food name/description/category.
**Errors**: `400` if `q` missing.

### `GET /search/filter`
Query: `?category=&minRating=&freeShipping=`

### `GET /search/suggested`
Top 5 open restaurants by rating.

---

## 8. Cart
Base: `/api/cart` — all routes 🔒 (one cart per user)

### `GET /cart`
**Response**: `{ "cart": { items: [...] }, "subtotal": number }`

### `POST /cart/items`
**Body**: `{ foodId (required), quantity (default 1), size (optional, must match one of the food's `sizes` labels) }`
Adding the same `foodId`+`size` combo again increments quantity instead of duplicating.

### `PUT /cart/items/:itemId`
**Body**: `{ quantity }` — setting `quantity <= 0` removes the item.

### `DELETE /cart/items/:itemId`
### `DELETE /cart`
Clears all items.

---

## 9. Orders
Base: `/api/orders`

### `POST /orders` 🔒 (checkout)
**Body**: `{ addressId (optional), paymentMethod: "cash" | "card" | "paypal" }`
Reads the caller's cart, **splits into one order per restaurant** if the cart has items from multiple restaurants, clears the cart. If `paymentMethod` isn't `cash`, runs the mock payment processor immediately.
**Response `201`**: `{ "orders": [ {...}, ... ] }`
**Errors**: `400` empty cart

### `GET /orders` 🔒
Caller's own order history. Query: `?status=placed|accepted|preparing|out_for_delivery|delivered|cancelled`

### `GET /orders/incoming` 🔒 chef-only
Orders for the calling chef's restaurant. Query: `?status=` (default: all active/non-terminal statuses).

### `GET /orders/:id` 🔒
Viewable by the customer who placed it, or the chef who owns its restaurant.

### `PUT /orders/:id/status` 🔒 chef-only, owner
**Body**: `{ status }` — one of `accepted | preparing | out_for_delivery | delivered | cancelled`.
Setting `delivered` marks `paymentStatus: "paid"` and credits the restaurant's balance. Blocked (`400`) once an order is already `delivered`/`cancelled`.

### `PUT /orders/:id/cancel` 🔒 (customer, owner)
Only works while status is still `placed`.

---

## 10. Payments
Base: `/api/payments`

**Security note**: full card numbers and CVC are never persisted — only `brand` and `last4` are stored. No real gateway is connected yet; `POST /payments/pay` uses a mock processor that always succeeds (see `src/utils/mockPayment.js`).

### `POST /payments/methods` 🔒
**Body**: `{ type: "card"|"paypal"|"cash", cardHolderName, cardNumber, expiryMonth, expiryYear, isDefault }`
(`cardNumber` is used only to derive `brand`/`last4` — never stored as-is.)

### `GET /payments/methods` 🔒
### `DELETE /payments/methods/:id` 🔒

### `POST /payments/pay` 🔒
**Body**: `{ orderId }` — retries/completes payment for an order not yet paid.
**Errors**: `400` if already paid.

### `GET /payments/balance` 🔒 chef-only
Returns the calling chef's restaurant balance (accumulated from delivered orders).

### `POST /payments/withdraw` 🔒 chef-only
**Body**: `{ amount }` — deducts from balance, creates a `Withdrawal` record (currently instant/mock).
**Errors**: `400` if amount exceeds balance.

---

## 11. Delivery
Base: `/api/delivery`

### `POST /delivery` 🔒 chef-only, must own the order's restaurant
**Body**: `{ orderId, driverId }` — `driverId` must belong to a user with role `driver`. Upserts the delivery record.

### `GET /delivery/:orderId` 🔒
Viewable by the order's customer, the assigned driver, or the owning chef.
**Response**: `{ "delivery": {...}, "distanceKm": number, "etaMinutes": number }` (distance/ETA only present once the driver has sent a location and the order's address has coordinates — Haversine formula, ~30 km/h average speed assumption.)

### `PUT /delivery/:orderId/location` 🔒 driver-only, must be the assigned driver
**Body**: `{ lat, lng }` — also broadcasts `location:updated` over Socket.io to anyone subscribed to `order:<id>`.

### `PUT /delivery/:orderId/status` 🔒 driver-only, must be the assigned driver
**Body**: `{ status }` — one of `picked_up | on_the_way | delivered`.
Setting `delivered` also marks the linked **Order** as `delivered`/`paid` and credits the restaurant balance (same effect as the chef doing it via `/orders/:id/status`).

---

## 12. Conversations
Base: `/api/conversations` — all routes 🔒, participant-scoped

### `POST /conversations`
**Body**: `{ participantId, orderId (optional, scopes the thread to a specific order) }`
Finds an existing 1:1 conversation with that participant (and order, if given) or creates one.

### `GET /conversations`
Caller's conversations, sorted by most recent activity.

### `GET /conversations/:id/messages`
Last 50 messages, oldest first. `404` if caller isn't a participant.

### `POST /conversations/:id/messages`
**Body**: `{ text }` — persists the message, pushes `chat:message` over Socket.io to the other participant, and creates a `Notification` for them.

### `PUT /conversations/:id/read`
Marks all messages in the thread as read by the caller.

---

## 13. Notifications
Base: `/api/notifications` — all routes 🔒

### `GET /notifications`
Query: `?unread=true` to filter.

### `PUT /notifications/:id/read`
### `PUT /notifications/read-all`

Notifications are created automatically by other modules (order status changes, delivery updates, new chat messages) — there's no manual "create notification" endpoint.

---

## 14. Reviews
Base: `/api/reviews`

### `POST /reviews` 🔒
**Body**: `{ orderId (required), foodId (optional), rating (required, 1-5), comment }`
The order must belong to the caller and be `delivered`. One review per order (`409` on duplicate). Automatically recalculates the restaurant's (and food's, if given) average `rating`.

### `GET /reviews/restaurant/:restaurantId`
Public.

### `GET /reviews/food/:foodId`
Public.

### `DELETE /reviews/:id` 🔒 owner
Recalculates ratings after removal.

---

## 15. Dashboard (chef-only)
Base: `/api/dashboard`

### `GET /dashboard` 🔒 chef-only
Aggregated view for the calling chef's restaurant:
```json
{
  "restaurant": { "id": "...", "name": "...", "balance": 0 },
  "revenue": { "total": 0, "today": 0, "thisWeek": 0 },
  "orders": { "requests": 0, "running": 0, "delivered": 0, "cancelled": 0 },
  "popularItems": [{ "food": "id", "name": "...", "totalQuantity": 0 }],
  "reviews": { "averageRating": 0, "totalReviews": 0, "recent": [ ... last 5 ... ] }
}
```
`requests` = orders still `placed`; `running` = `accepted`/`preparing`/`out_for_delivery`. `popularItems` is computed from actual order history (top 5 by quantity sold), not a manually-set flag.

---

## Real-time (Socket.io)

Connect to the same host/port as the REST API. Auth is via the handshake, not a header:

```js
io("http://localhost:5000", { auth: { token: "<jwt>" } });
```

Every connected user auto-joins a personal room `user:<userId>`.

| Direction | Event | Payload | Notes |
|---|---|---|---|
| emit | `order:subscribe` | `{ orderId }` | Join `order:<id>` room to receive tracking updates |
| emit | `location:update` | `{ orderId, lat, lng }` | Driver → broadcasts `location:updated` to the order room |
| listen | `location:updated` | `{ orderId, lat, lng }` | |
| emit | `call:offer` / `call:answer` / `call:ice-candidate` / `call:end` | `{ toUserId, payload }` | WebRTC signaling relay — server never touches audio, just forwards |
| listen | (same event names) | `{ fromUserId, payload }` | |
| listen | `chat:message` | `{ conversationId, message }` | Pushed when the other participant sends a message via REST |
| listen | `notification:new` | `{ notification }` | Pushed whenever a Notification is created server-side |

The REST endpoints above are the source of truth for persisted data (messages, locations, notifications) — sockets are purely for pushing live updates to already-connected clients.

---

## Data Models

Field types as stored in MongoDB (via Mongoose). `ref` = ObjectId reference to another collection.

### User
| field | type |
|---|---|
| name | String, required |
| email | String, required, unique |
| password | String, required (bcrypt hash) |
| role | `customer` \| `chef` \| `driver`, default `customer` |
| phone, bio, avatar | String |
| location | `{ lat, lng }` |

### Address
| field | type |
|---|---|
| owner | ref User, required |
| label | `Home` \| `Work` \| `Other`, default `Home` |
| street | String, required |
| apartment, postcode | String |
| lat, lng | Number |
| isDefault | Boolean |

### Restaurant
| field | type |
|---|---|
| owner | ref User, required |
| name | String, required |
| description | String |
| cuisineTags | [String] |
| banner | String |
| deliveryTime | String |
| freeShipping | Boolean |
| rating | Number, default 0 (auto-computed) |
| isOpen | Boolean, default true |
| balance | Number, default 0 |

### Food
| field | type |
|---|---|
| restaurant | ref Restaurant, required |
| name | String, required |
| price | Number, required |
| category | String |
| ingredients | [String] |
| description | String |
| sizes | `[{ label, price }]` |
| image | String |
| isPopular | Boolean |
| rating | Number, default 0 (auto-computed) |

### Offer
| field | type |
|---|---|
| restaurant | ref Restaurant (optional) |
| code | String, required, unique |
| discountPercent | Number, required |
| description | String |
| expiresAt | Date |
| active | Boolean, default true |

### Cart
| field | type |
|---|---|
| owner | ref User, required, unique |
| items | `[{ food (ref), restaurant (ref), name, price, size, quantity }]` |

### Order
| field | type |
|---|---|
| customer | ref User, required |
| restaurant | ref Restaurant, required |
| items | `[{ food (ref), name, price, size, quantity }]` |
| subtotal, deliveryFee, total | Number |
| status | `placed \| accepted \| preparing \| out_for_delivery \| delivered \| cancelled` |
| address | `{ label, street, apartment, postcode, lat, lng }` (snapshot at checkout) |
| paymentMethod | `cash \| card \| paypal` |
| paymentStatus | `pending \| paid \| failed` |

### PaymentMethod
| field | type |
|---|---|
| owner | ref User, required |
| type | `card \| paypal \| cash` |
| brand, last4, cardHolderName | String |
| expiryMonth, expiryYear | Number |
| gatewayToken | String (reserved for future real gateway integration) |
| isDefault | Boolean |

### Withdrawal
| field | type |
|---|---|
| restaurant | ref Restaurant, required |
| amount | Number, required |
| status | `pending \| completed` |

### Delivery
| field | type |
|---|---|
| order | ref Order, required, unique |
| driver | ref User, required |
| status | `assigned \| picked_up \| on_the_way \| delivered` |
| currentLocation | `{ lat, lng }` |

### Conversation
| field | type |
|---|---|
| participants | [ref User] (exactly 2) |
| order | ref Order (optional) |
| lastMessage | String |
| lastMessageAt | Date |

### Message
| field | type |
|---|---|
| conversation | ref Conversation, required |
| sender | ref User, required |
| text | String, required |
| readBy | [ref User] |

### Notification
| field | type |
|---|---|
| owner | ref User, required |
| type | String (e.g. `order_update`, `message`) |
| title, body | String |
| data | Mixed (e.g. `{ orderId }`) |
| read | Boolean, default false |

### Review
| field | type |
|---|---|
| customer | ref User, required |
| restaurant | ref Restaurant, required |
| food | ref Food (optional) |
| order | ref Order, required, unique (one review per order) |
| rating | Number, required, 1–5 |
| comment | String |

---

## Third-party services

| Service | Status |
|---|---|
| MongoDB Atlas | ✅ Live |
| OpenStreetMap Nominatim (geocoding) | ✅ Live, no key needed |
| Socket.io (real-time) + WebRTC signaling | ✅ Live, self-hosted, replaces Twilio |
| Gmail SMTP (Nodemailer) | 🔑 Credentials in `.env`, integration not yet wired into code |
| Cloudinary (image upload) | 🔑 Credentials in `.env`, integration not yet wired into code |
| Paystack (payments) | 🔑 Credentials in `.env`, integration not yet wired into code — `mockProcessPayment` still used |
