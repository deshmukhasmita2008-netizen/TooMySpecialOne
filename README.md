# 💌 Boyfriend Day Surprise Website

> A personal, romantic virtual surprise — a digital love letter made just for him.

---

## 📁 Files

```
Y/
├── index.html       ← Main website (all sections here)
├── style.css        ← All styling (colors, fonts, animations)
├── script.js        ← All interactivity (effects, envelope, sparkles)
├── your-song.mp3    ← (Optional) Add your background music here
├── photos/
│   ├── photo1.jpg   ← "Our first memories ♡"
│   ├── photo2.jpg   ← "That random day I'll never forget"
│   ├── photo3.jpg   ← "My favorite picture of us"
│   ├── photo4.jpg   ← "One of my happiest days"
│   ├── photo5.jpg   ← "Us being us ♡"
│   └── photo6.jpg   ← "A moment in our little world"
└── README.md
```

---

## 🌸 How to Customize

### Adding Your Photos
1. Create a folder called `photos/` next to `index.html`
2. Add your photos named `photo1.jpg` through `photo6.jpg`
3. Or edit the `src=""` paths in `index.html` → Section 3 to any filename

### Editing Captions
In `index.html`, find Section 3 and change the text inside:
```html
<p class="photo-caption">Your custom caption here ♡</p>
```

### Editing the Love Letter
In `index.html`, find Section 6 and edit the text between the `<p class="letter-body">` tags.

### Editing the Timeline
In `index.html`, find Section 5. Change the text inside:
```html
<span class="tl-date">Your Date Here</span>
<h3 class="tl-title">Your Memory Title</h3>
<p class="tl-text">Your memory description here.</p>
```

### Adding Background Music
1. Drop your `.mp3` file in the same folder as `index.html`
2. Rename it to `your-song.mp3`  
   OR edit this line in `index.html`:
   ```html
   <source src="your-song.mp3" type="audio/mpeg" />
   ```

### Editing Colors
Open `style.css` and find the `:root {}` block at the top. Change any of the color values there.

---

## 🎀 Opening the Website

Just double-click `index.html` to open it in any browser. No server needed!

---

*Made with way too much love ♡*
