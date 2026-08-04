import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Image,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { apiRequest } from '../../../shared/api';
import styles from './AddNewItemScreen.styles';

// ---------------------------------------------------------------------------
// TODO: replace with your real Cloudinary account details (or swap this whole
// upload function for whatever image host your team actually uses).
// Create a free account at cloudinary.com, then create an "unsigned" upload
// preset under Settings > Upload > Upload presets.
// ---------------------------------------------------------------------------
const CLOUDINARY_CLOUD_NAME = 'pcan1aet';
const CLOUDINARY_UPLOAD_PRESET = 'food_mobile_app_uploads';

// ---------------------------------------------------------------------------
// Food categories. Must match the tabs ChefMenuScreen filters by exactly:
// TABS = ['All', 'Breakfast', 'Lunch', 'Dinner']. "All" is a filter option
// there, not a real category, so it's excluded here.
// ---------------------------------------------------------------------------
const FOOD_CATEGORIES = ['Breakfast', 'Lunch', 'Dinner'];

// ---------------------------------------------------------------------------
// Static ingredient options.
// No /ingredients endpoint exists in the Swagger doc, so these are hardcoded
// for now. If a real ingredients endpoint gets added later, swap the two
// arrays below for a useEffect fetch.
// ---------------------------------------------------------------------------
const INGREDIENT_CATEGORIES = {
    Basic: [
        { id: 'salt', label: 'Salt', icon: 'shaker-outline' },
        { id: 'chicken', label: 'Chicken', icon: 'food-drumstick-outline' },
        { id: 'onion', label: 'Onion', icon: 'circle-outline' },
        { id: 'garlic', label: 'Garlic', icon: 'garlic' },
        { id: 'peppers', label: 'Peppers', icon: 'chili-mild-outline' },
        { id: 'ginger', label: 'Ginger', icon: 'leaf' },
    ],
    Fruit: [
        { id: 'avocado', label: 'Avocado', icon: 'fruit-pear' },
        { id: 'apple', label: 'Apple', icon: 'food-apple-outline' },
        { id: 'blueberry', label: 'Blueberry', icon: 'fruit-grapes-outline' },
        { id: 'broccoli', label: 'Broccoli', icon: 'leaf' },
        { id: 'orange', label: 'Orange', icon: 'fruit-citrus' },
        { id: 'walnut', label: 'Walnut', icon: 'peanut-outline' },
    ],
};

export default function AddNewItemScreen({ navigation }) {
    const [itemName, setItemName] = useState('');
    const [price, setPrice] = useState('');
    const [pickup, setPickup] = useState(true);
    const [delivery, setDelivery] = useState(false);
    const [details, setDetails] = useState('');
    const [images, setImages] = useState([]); // local URIs picked from device
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [category, setCategory] = useState(FOOD_CATEGORIES[0]);
    const [restaurantId, setRestaurantId] = useState(null);
    const [loadingRestaurant, setLoadingRestaurant] = useState(true);
    const [saving, setSaving] = useState(false);

    // Fetch the chef's own restaurant on mount so we know which restaurant
    // this food item should be attached to.
    useEffect(() => {
        (async () => {
            try {
                const restaurant = await apiRequest('/restaurants/mine', { method: 'GET' });
                setRestaurantId(restaurant?.id ?? restaurant?._id ?? null);
            } catch (err) {
                Alert.alert(
                    'Could not load restaurant',
                    err.message || 'You need a restaurant set up before adding food items.'
                );
            } finally {
                setLoadingRestaurant(false);
            }
        })();
    }, []);

    const toggleIngredient = (id) => {
        setSelectedIngredients((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
    };

    const pickImage = async () => {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permission.granted) {
            Alert.alert('Permission needed', 'Please allow photo library access to upload images.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            quality: 0.7,
        });

        if (!result.canceled && result.assets?.length) {
            setImages((prev) => [...prev, result.assets[0]]);
        }
    };

    const removeImage = (index) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
    };

    const resetForm = () => {
        setItemName('');
        setPrice('');
        setPickup(true);
        setDelivery(false);
        setDetails('');
        setImages([]);
        setSelectedIngredients([]);
        setCategory(FOOD_CATEGORIES[0]);
    };

    const validate = () => {
        if (!itemName.trim()) {
            Alert.alert('Missing item name', 'Please enter a name for this item.');
            return false;
        }
        if (!price.trim() || isNaN(Number(price))) {
            Alert.alert('Invalid price', 'Please enter a valid numeric price.');
            return false;
        }
        if (!restaurantId) {
            Alert.alert('No restaurant found', 'You need a restaurant before you can add food items.');
            return false;
        }
        return true;
    };

    // Uploads the first picked image to Cloudinary and returns the real,
    // hosted image URL — this is what gets sent as "image" in the POST /food
    // payload. Swap this out for your own image host's upload call if you're
    // using something other than Cloudinary.
    const getImagePayload = async () => {
        if (images.length === 0) return undefined;

        const asset = images[0];
        const uriParts = asset.uri.split('.');
        const fileType = uriParts[uriParts.length - 1];

        const form = new FormData();
        form.append('file', {
            uri: asset.uri,
            name: `item.${fileType}`,
            type: `image/${fileType}`,
        });
        form.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

        const res = await fetch(
            `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
            { method: 'POST', body: form }
        );
        const data = await res.json();

        if (!res.ok || !data.secure_url) {
            throw new Error(data.error?.message || 'Image upload failed');
        }

        return data.secure_url;
    };

    const handleSave = async () => {
        if (!validate()) return;

        setSaving(true);
        try {
            const imagePayload = await getImagePayload();

            // Ingredient ids -> human-readable labels, since the schema wants
            // an array of strings.
            const allIngredients = Object.values(INGREDIENT_CATEGORIES).flat();
            const ingredientLabels = selectedIngredients.map(
                (id) => allIngredients.find((ing) => ing.id === id)?.label || id
            );

            // Matches the confirmed POST /food schema exactly:
            // { restaurantId, name, price, category, ingredients, description, sizes, image }
            const payload = {
                restaurantId,
                name: itemName.trim(),
                price: Number(price),
                category,
                ingredients: ingredientLabels,
                description: details,
                sizes: [], // no size tiers in this UI yet — extend if needed
                ...(imagePayload ? { image: imagePayload } : {}),
            };

            const response = await apiRequest('/food', {
                method: 'POST',
                data: payload,
            });

            Alert.alert('Success', 'Item saved successfully.');
            resetForm();
            navigation?.goBack?.();
            return response;
        } catch (err) {
            Alert.alert('Save failed', err.message || 'Something went wrong while saving.');
        } finally {
            setSaving(false);
        }
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation?.goBack?.()}>
                    <Ionicons name="chevron-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Add New Items</Text>
                <TouchableOpacity onPress={resetForm}>
                    <Text style={styles.resetText}>RESET</Text>
                </TouchableOpacity>
            </View>

            {/* Item name */}
            <Text style={styles.label}>ITEM NAME</Text>
            <TextInput
                style={styles.input}
                placeholder="e.g. Mazafichiken Holim"
                value={itemName}
                onChangeText={setItemName}
            />

            {/* Photo / video upload */}
            <Text style={styles.label}>UPLOAD PHOTO/VIDEO</Text>
            <View style={styles.imageRow}>
                {images.map((img, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.imageThumbWrapper}
                        onLongPress={() => removeImage(index)}
                    >
                        <Image source={{ uri: img.uri }} style={styles.imageThumb} />
                    </TouchableOpacity>
                ))}
                <TouchableOpacity style={styles.uploadBox} onPress={pickImage}>
                    <Ionicons name="cloud-upload-outline" size={22} color="#F97316" />
                    <Text style={styles.uploadText}>Add</Text>
                </TouchableOpacity>
            </View>
            {images.length > 1 && (
                <Text style={styles.imageHint}>
                    Note: only the first photo is currently sent to the server (the API stores a
                    single image per item).
                </Text>
            )}

            {/* Price + delivery options */}
            <Text style={styles.label}>PRICE</Text>
            <View style={styles.priceRow}>
                <TextInput
                    style={styles.priceInput}
                    placeholder="$50"
                    keyboardType="numeric"
                    value={price}
                    onChangeText={setPrice}
                />
                <TouchableOpacity style={styles.checkboxRow} onPress={() => setPickup(!pickup)}>
                    <Ionicons
                        name={pickup ? 'checkbox' : 'square-outline'}
                        size={20}
                        color={pickup ? '#F97316' : '#999'}
                    />
                    <Text style={styles.checkboxLabel}>Pick up</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.checkboxRow} onPress={() => setDelivery(!delivery)}>
                    <Ionicons
                        name={delivery ? 'checkbox' : 'square-outline'}
                        size={20}
                        color={delivery ? '#F97316' : '#999'}
                    />
                    <Text style={styles.checkboxLabel}>Delivery</Text>
                </TouchableOpacity>
            </View>

            {/* Category (required by the API, not present in the mockup) */}
            <Text style={styles.label}>CATEGORY</Text>
            <View style={styles.categoryRow}>
                {FOOD_CATEGORIES.map((c) => (
                    <TouchableOpacity
                        key={c}
                        style={[styles.categoryChip, category === c && styles.categoryChipSelected]}
                        onPress={() => setCategory(c)}
                    >
                        <Text
                            style={[
                                styles.categoryChipText,
                                category === c && styles.categoryChipTextSelected,
                            ]}
                        >
                            {c}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Ingredients */}
            {Object.entries(INGREDIENT_CATEGORIES).map(([catName, items]) => (
                <View key={catName}>
                    <View style={styles.sectionHeaderRow}>
                        <Text style={styles.sectionHeader}>{catName}</Text>
                        <TouchableOpacity>
                            <Text style={styles.seeAll}>See All</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {items.map((ing) => {
                            const selected = selectedIngredients.includes(ing.id);
                            return (
                                <TouchableOpacity
                                    key={ing.id}
                                    style={styles.ingredientItem}
                                    onPress={() => toggleIngredient(ing.id)}
                                >
                                    <View
                                        style={[
                                            styles.ingredientCircle,
                                            selected && styles.ingredientCircleSelected,
                                        ]}
                                    >
                                        <MaterialCommunityIcons
                                            name={ing.icon}
                                            size={22}
                                            color={selected ? '#fff' : '#F97316'}
                                        />
                                    </View>
                                    <Text style={styles.ingredientLabel}>{ing.label}</Text>
                                </TouchableOpacity>
                            );
                        })}
                    </ScrollView>
                </View>
            ))}

            {/* Details */}
            <Text style={styles.label}>DETAILS</Text>
            <TextInput
                style={styles.detailsInput}
                placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Bibendum in vel, mattis et amet dui mauris turpis."
                multiline
                numberOfLines={4}
                value={details}
                onChangeText={setDetails}
            />

            {/* Save */}
            <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSave}
                disabled={saving || loadingRestaurant}
            >
                {saving ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.saveButtonText}>SAVE CHANGES</Text>
                )}
            </TouchableOpacity>
        </ScrollView>
    );
}