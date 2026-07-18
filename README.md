# Food Delivery App

A full-stack food delivery platform with two experiences in one app — customers
ordering food, and chefs/sellers managing their menu and orders — sharing a
single authentication flow with role-based navigation.

## Tech Stack

| Layer | Technology |
|---|---|
| Mobile app | React Native (Expo, managed workflow) |
| Backend | Node.js + Express |
| Database | Firebase (Firestore + Firebase Auth) |
| Payments | Paystack |
| Navigation | React Navigation (native-stack + bottom-tabs) |
| Styling | `StyleSheet.create` (no NativeWind/Tailwind — see [Styling Convention](#styling-convention)) |
| Language | JavaScript (no TypeScript) |

## Project Structure

This is a monorepo using npm workspaces, with two apps and one shared package:

```
food-delivery-app/
├── apps/
│   ├── mobile/              # Expo app
│   └── server/              # Node.js backend
├── packages/
│   └── shared/              # types, constants, schemas shared by both apps
└── package.json              # workspace root
```

### Mobile app (`apps/mobile`)

```
apps/mobile/src/
├── features/                 # one folder per feature domain
│   ├── auth/                 # Splash, Onboarding, Login, Signup, Forgot Password, Verification
│   ├── location/             # Location selection
│   ├── menu/                 # Menu list, Food detail
│   ├── cart/                 # My Cart, Edit Cart
│   ├── checkout/             # Payment Method, Add Card, Payment Successful
│   ├── orders/                # My Order, Tracking, Delivery Call, Delivery Message
│   ├── profile/               # Personal Profile, Addresses
│   └── chef/                  # Everything chef/seller-facing
│       ├── menu-management/   # Chef Menu, Add New Item
│       ├── dashboard/          # Seller Dashboard
│       ├── orders/             # Running Orders, Chef Notifications
│       ├── inventory/          # My Food
│       ├── payments/           # Withdrawal, Payment Withdrawal
│       └── engagement/         # Chef Messages, Chef Review
├── navigation/                # RootNavigator, AuthNavigator, CustomerNavigator, ChefNavigator
└── shared/
    ├── components/             # shared UI (ChatThread, ReviewCard, NotificationBanner, etc.)
    ├── hooks/
    ├── theme/
    └── utils/
```

### Server (`apps/server`)

```
apps/server/src/
├── features/                  # mirrors the mobile feature names
│   ├── auth/
│   ├── location/
│   ├── menu/
│   ├── cart/
│   ├── checkout/               # includes Paystack webhook handling
│   ├── orders/
│   ├── profile/
│   └── chef/
│       ├── menu-management/
│       ├── dashboard/
│       ├── orders/
│       ├── inventory/
│       ├── payments/            # Paystack Transfers (withdrawals)
│       └── engagement/
└── shared/
    ├── middleware/
    ├── firebase-admin.js         # Firebase Admin SDK — privileged writes, role claims
    └── utils/
```

Each feature follows: `feature.routes.js` → `feature.controller.js` → `feature.service.js`.

## Screen Convention

Every screen in the mobile app is exactly **2 files**, flat inside its feature
folder — no per-screen subfolders:

```
features/cart/
├── MyCartScreen.jsx
├── MyCartScreen.styles.js
├── EditCartScreen.jsx
└── EditCartScreen.styles.js
```

## Styling Convention

We use React Native's built-in `StyleSheet.create` — **not** NativeWind or
Tailwind — so there's no shared build config that can be misconfigured across
machines and break the app for everyone.

```jsx
// MyCartScreen.jsx
import { View, Text } from 'react-native';
import styles from './MyCartScreen.styles';

export default function MyCartScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Cart</Text>
    </View>
  );
}
```

```js
// MyCartScreen.styles.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: '600' },
});
```

## Architecture Notes

- **One app, role-based navigation** — chef and customer screens live in the
  same Expo app. After login, `RootNavigator` reads the user's `role`
  (`customer` or `chef`) and renders `CustomerNavigator` or `ChefNavigator`
  accordingly.
- **Firebase handles most reads/writes directly** — menu browsing, cart,
  profile, order tracking, chef messages, and notifications go straight from
  the mobile app to Firestore, using its real-time listeners instead of a
  custom WebSocket layer.
- **The Node server only handles money** — checkout initiation and Paystack
  webhook verification, plus chef withdrawal requests. Payment status and
  withdrawal approval are never written to Firestore directly by the mobile
  app — only the server does this, after verifying with Paystack, so no
  client can fake a successful payment or a payout.

## Team & Feature Ownership

| Person | Screens |
|---|---|
| **Ridwan** | Splash, Onboarding, Login, Forgot Password, Verification, Sign Up, Location |
| **Gideon** | Menu (list), Personal Profile, Addresses, Chef Menu, Seller Dashboard, Add New Item |
| **David** | Food Detail, My Cart, Edit Cart, Payment Method, Add Card, Payment Successful |
| **Divinegift** | My Order, Tracking, Delivery Call, Delivery Message, Chef Messages, Chef Review |
| **Onah** | Running Orders, Chef Notifications, My Food, Withdrawal, Payment Withdrawal |

## Getting Started

### Prerequisites
- Node.js v20.19.4+ (use `nvm` to match versions across the team)
- Expo Go app installed on your phone (for previewing without an emulator)

### Install

```bash
git clone <repo-url>
cd food-delivery-app
npm install
```

This installs dependencies for both `apps/mobile` and `apps/server` in one
pass via workspaces.

### Environment variables

Create `apps/mobile/.env` (see `.env.example`):

```
API_URL=http://<your-laptop-lan-ip>:4000
FIREBASE_API_KEY=...
FIREBASE_PROJECT_ID=...
```

Create `apps/server/.env`:

```
PORT=4000
PAYSTACK_SECRET_KEY=...
FIREBASE_ADMIN_CREDENTIALS=...
```

> Your phone and laptop must be on the same Wi-Fi network for the mobile app
> to reach your local server — `localhost` on your phone refers to the phone
> itself, not your laptop.

### Run everything

```bash
npm run dev
```

This runs the Expo dev server and the Node backend together. Scan the QR
code with Expo Go to preview on your phone.

### Run individually

```bash
npm run dev -w apps/mobile
npm run dev -w apps/server
```

## Contributing

- Work inside your assigned feature folder — see [Team & Feature Ownership](#team--feature-ownership) above.
- Every screen must export a default component matching its filename, even as
  a placeholder, so navigation doesn't break for everyone else:
  ```jsx
  export default function YourScreenName() {
    return null;
  }
  ```
- Branch naming: `feature/<feature-name>-<short-description>`, e.g.
  `feature/orders-tracking-screen`.
- Keep business logic in `.service.js` files on the server, not in
  controllers — controllers should only handle request/response.
- Don't install NativeWind, Tailwind, or any styling library that requires
  shared build config — stick to `StyleSheet.create` (see
  [Styling Convention](#styling-convention)).
