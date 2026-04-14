import subprocess

# --- SETTINGS ---
# Change to your GitHub username and repository name in the format "username/repo"
REPO = "joy111119/salad-configurator"

# --- TICKET DATA ---
tickets = [
   {
        "title": "Task 2.1: React Router installation and configuration",
        "body": "**Goal:** Enable routing for the entire application.\n\n**Tech Spec:** Install React Router: `npm install react-router-dom`. Wrap the `<App />` component in the `main.tsx` file inside `<BrowserRouter>` tags."
    },
    {
        "title": "Task 2.2: Creating page components",
        "body": "**Goal:** Create the main page views for the application.\n\n**Tech Spec:** Create a folder `src/pages`. Create `Configurator.tsx`, `Community.tsx`, and `Print.tsx` inside it. Move the center graphic placeholder from week 1's `App.tsx` into the new `Configurator.tsx` page. Make `Community` and `Print` just display a simple text 'Coming soon...'."
    },
    {
        "title": "Task 2.3: Connecting navigation",
        "body": "**Goal:** Turn the Header into working navigation and connect routes.\n\n**Tech Spec:** Go to `App.tsx`, import `Routes` and `Route`, and define the routes: `/` (element: Configurator), `/community` (element: Community), and `/print` (element: Print). Modify `Header.tsx` to use `<Link to=\"/community\">` for the 'Saved recipes' link and `<Link to=\"/\">` for the logo."
    },
    {
        "title": "Task 2.4: Defining data states for the Configurator",
        "body": "**Goal:** Prepare the Configurator page to receive data from the backend.\n\n**Tech Spec:** In `Configurator.tsx`, use React's `useState` to create three states: `bowls` (Type: `Bowl[]`), `categories` (Type: `Category[]`), and `ingredients` (Type: `Ingredient[]`). Set the initial value for all of them as an empty array `[]`."
    },
    {
        "title": "Task 2.5: API Service Layer (Architecture)",
        "body": "**Goal:** Separate network requests from UI components into their own dedicated file.\n\n**Tech Spec:** Create a folder `src/services` and a file `api.ts` inside it. Write and export asynchronous functions `getBowls()`, `getCategories()`, and `getIngredients()`. These functions should `fetch` from `https://fresse-api.onrender.com/api/...` and return the parsed JSON data."
    },
    {
        "title": "Task 2.6: Fetching Bowls",
        "body": "**Goal:** Use the new API service to fetch bowl data when the page loads.\n\n**Tech Spec:** In `Configurator.tsx`, import your new `getBowls` function. Create a `useEffect` with an empty dependency array `[]`. Inside it, call this function and save the returned data to the `bowls` state."
    },
    {
        "title": "Task 2.7: Fetching Categories",
        "body": "**Goal:** Fetch the category data to the state.\n\n**Tech Spec:** Inside the same `useEffect` created in the previous task, call `getCategories()`. Save the result to the `categories` state. Remember to handle potential errors with a `try/catch` block and perhaps add an `isLoading` state!"
    },
    {
        "title": "Task 2.8: Fetching Ingredients",
        "body": "**Goal:** Fetch all ingredients from the database.\n\n**Tech Spec:** Inside the same `useEffect`, call `getIngredients()`. Save the result to the `ingredients` state. Print any errors to the console."
    },
    {
        "title": "Task 2.9: Ingredient card UI",
        "body": "**Goal:** Build a reusable component for a single ingredient.\n\n**Tech Spec:** Create the file `src/components/IngredientCard.tsx`. It should receive a single `ingredient` as props (`interface Props { ingredient: Ingredient }`). Style it nicely into a square card showing the `name` and mapping the `diets` array (G, L, V) into small tags at the bottom."
    },
    {
        "title": "Task 2.10: Mapping Bowls (Left Panel)",
        "body": "**Goal:** Render the fetched bowls dynamically in the UI.\n\n**Tech Spec:** Pass the fetched `bowls` array to the `BowlSelection.tsx` component via props. Replace the hardcoded placeholders with a `.map()` function that dynamically renders a button for each bowl showing its name."
    },
    {
        "title": "Task 2.11: Mapping Bases (Right Panel)",
        "body": "**Goal:** Render the salad/quark bases dynamically in the right panel.\n\n**Tech Spec:** Pass the `ingredients` array to the `BaseSelection.tsx` component via props. Filter out only the ingredients that belong to the base category (`categoryId === 6`). Use `.map()` to render the bases dynamically."
    },
    {
        "title": "Task 2.12: Mapping Ingredients and Categories",
        "body": "**Goal:** Render category filter buttons and the main ingredient grid.\n\n**Tech Spec:** In `IngredientSection.tsx`, accept `categories` and `ingredients` as props. Map the `categories` (filter out `id === 6`) to create filter buttons. Filter the `ingredients` (excluding category 6) and map them to render an `<IngredientCard>` for each item."
    },
    {
        "title": "Task 2.13: Connecting the Print Route",
        "body": "**Goal:** Enable navigation to the Print page as a placeholder for later features.\n\n**Tech Spec:** Open `src/components/SummaryBar.tsx`. Import `<Link>` from `react-router-dom`. Wrap the 'Print' button (or create one) in a `<Link to=\"/print\">` to make it functional. (Note: In later sprints, we will replace this with a real `window.print()` functionality, but routing is good for now!)."
    }

]

def create_issue(ticket):
    """Creates a single issue in GitHub via CLI."""
    cmd = [
        "gh", "issue", "create",
        "--repo", REPO,
        "--title", ticket["title"],
        "--body", ticket["body"]
    ]
    
    try:
        subprocess.run(cmd, capture_output=True, text=True, check=True)
        print(f"✅ Created: {ticket['title']}")
    except subprocess.CalledProcessError as e:
        print(f"❌ Error in task {ticket['title']}: {e.stderr}")

def main():
    print(f"🚀 Starting ticket import to repository: {REPO}\n")
    
    try:
        subprocess.run(["gh", "--version"], check=True, capture_output=True)
    except Exception:
        print("❌ Error: GitHub CLI (gh) is not installed or not in PATH.")
        return

    for t in tickets:
        create_issue(t)

    print(f"\n🎉 All {len(tickets)} tickets processed!")

if __name__ == "__main__":
    main()