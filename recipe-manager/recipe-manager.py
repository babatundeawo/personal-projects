# Initialize an empty dictionary to store recipes
recipes = {}

while True:
    print("\nOptions")
    print("1. Add Recipe")
    print("2. Remove Recipe")
    print("3. List Recipes")
    print("4. Search for Recipe by Ingredient")
    print("5. Exit")

    choice = input("Enter choice (1/2/3/4): ")

    if choice == '1':
        name = input("Enter Recipe name: ").strip().lower()
        ingredients = []

        print("Enter ingredients. Type 'exit' when done:")
        while True:
            ingredient = input("Ingredient: ").strip().lower()
            if ingredient == 'exit':
                break
            ingredients.append(ingredient)

        recipes[name] = ingredients
        print(f"Recipe '{name}' has been added.")

    elif choice == '2':
        name = input("Enter recipe name to remove: ").strip().lower()
        if name in recipes:
            recipes.pop(name)
            print(f"Recipe '{name}' has been removed.")
        else:
            print(f"Recipe '{name}' not found.")

    elif choice == '3':
        if not recipes:
            print("No recipes available.")
        else:
            print("Recipes:")
            for recipe_name, ingredients in recipes.items():
                print(f"{recipe_name.title()}: {', '.join(ingredients)}")

    elif choice == '4':
        ingredient = input("Enter ingredient to search for: ").strip().lower()
        found = False
        print("Recipes containing the ingredient:")
        for recipe_name, ingredients in recipes.items():
            if ingredient in ingredients:
                print(f"- {recipe_name.title()}")
                found = True
        if not found:
            print(f"No recipes found with the ingredient '{ingredient}'.")

    elif choice == '5':
        print("Exiting the recipe manager.")
        break

    else:
        print("Invalid Input. Please try again.")
