# Exercise Structure

This folder contains all your animation exercises. Each exercise is self-contained in its own folder.

## Adding a New Exercise

### 1. Create a new folder

```bash
mkdir exercises/your-exercise-name
```

### 2. Create three files in the folder

**`your-exercise-name.html`** - The HTML structure

```html
<div class="your-container">
  <!-- Your HTML here -->
</div>
```

**`your-exercise-name.css`** - The styles

```css
.your-container {
  /* Your styles here */
}
```

**`your-exercise-name.js`** - The JavaScript logic

```javascript
export function init() {
  // Your initialization code here
  // This runs when the exercise loads
}

// Optional: cleanup function
export function cleanup() {
  // Clean up event listeners, timers, etc.
  // This runs when switching to another exercise
}
```

### 3. Register the exercise

Add your exercise to `exercises/exercises-config.js`:

```javascript
{
  id: 'your-exercise-name',
  title: 'Your Exercise Title',
  description: 'Brief description of what this demonstrates',
  folder: 'your-exercise-name',
}
```

That's it! Your exercise will automatically appear in the sidebar.

## Example Structure

```
exercises/
├── like-button/
│   ├── like-button.html
│   ├── like-button.css
│   └── like-button.js
├── your-new-exercise/
│   ├── your-new-exercise.html
│   ├── your-new-exercise.css
│   └── your-new-exercise.js
└── exercises-config.js
```

## Tips

- Use kebab-case for file and folder names
- The `id` and `folder` in config should match your folder name
- Keep exercises focused on one concept
- Add comments to explain key concepts
- Use the `cleanup()` function to prevent memory leaks
