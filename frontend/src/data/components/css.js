export const cssCategories = [
  { id: 'all', label: 'All' },
  { id: 'buttons', label: 'Buttons' },
  { id: 'cards', label: 'Cards' },
  { id: 'inputs', label: 'Inputs' },
  { id: 'loaders', label: 'Loaders' }
];

export const cssComponents = [
  {
    id: 'css-btn-1',
    title: 'Neon Button',
    category: 'buttons',
    htmlCode: `<button class="neon-button">Neon Button</button>`,
    cssCode: `.neon-button {
  padding: 10px 24px;
  background: transparent;
  color: #03e9f4;
  font-weight: bold;
  border: 2px solid #03e9f4;
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 2px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: 0.2s;
}

.neon-button:hover {
  background: #03e9f4;
  color: #050801;
  box-shadow: 0 0 10px #03e9f4, 
              0 0 40px #03e9f4, 
              0 0 80px #03e9f4;
}`
  },
  {
    id: 'css-btn-2',
    title: '3D Button',
    category: 'buttons',
    htmlCode: `<button class="pushable">
  <span class="front">
    Push me
  </span>
</button>`,
    cssCode: `.pushable {
  background: hsl(340deg 100% 32%);
  border-radius: 12px;
  border: none;
  padding: 0;
  cursor: pointer;
  outline-offset: 4px;
}
.front {
  display: block;
  padding: 12px 24px;
  border-radius: 12px;
  font-size: 1.25rem;
  background: hsl(345deg 100% 47%);
  color: white;
  transform: translateY(-6px);
  transition: transform 600ms cubic-bezier(.3, .7, .4, 1);
}
.pushable:active .front {
  transform: translateY(-2px);
  transition: transform 34ms;
}
.pushable:focus:not(:focus-visible) {
  outline: none;
}`
  },
  {
    id: 'css-btn-3',
    title: 'Gradient Border',
    category: 'buttons',
    htmlCode: `<button class="gradient-border">Gradient</button>`,
    cssCode: `.gradient-border {
  padding: 12px 24px;
  background: #000;
  color: white;
  border: double 3px transparent;
  border-radius: 6px;
  background-image: linear-gradient(#000, #000), 
                    linear-gradient(to right, #8a2be2, #4169e1);
  background-origin: border-box;
  background-clip: padding-box, border-box;
  cursor: pointer;
  font-weight: bold;
  transition: opacity 0.3s;
}
.gradient-border:hover {
  opacity: 0.8;
}`
  },
  {
    id: 'css-card-1',
    title: 'Hover Card',
    category: 'cards',
    htmlCode: `<div class="card">
  <h3>Hover Me</h3>
  <p>Simple elegant hover effect.</p>
</div>`,
    cssCode: `.card {
  width: 250px;
  padding: 20px;
  background: #1a1a1a;
  border-radius: 10px;
  color: white;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.card h3 {
  margin: 0 0 10px 0;
  color: #fff;
}
.card p {
  color: #888;
  font-size: 0.9em;
}
.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.4);
}`
  },
  {
    id: 'css-load-1',
    title: 'Spinner',
    category: 'loaders',
    htmlCode: `<div class="loader"></div>`,
    cssCode: `.loader {
  width: 48px;
  height: 48px;
  border: 5px solid #FFF;
  border-bottom-color: #FF3D00;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}`
  },
  {
    id: 'css-inp-1',
    title: 'Animated Input',
    category: 'inputs',
    htmlCode: `<div class="input-group">
  <input type="text" required>
  <label>Username</label>
</div>`,
    cssCode: `.input-group {
  position: relative;
  width: 200px;
}
.input-group input {
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  margin-bottom: 30px;
  border: none;
  border-bottom: 1px solid #fff;
  outline: none;
  background: transparent;
}
.input-group label {
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  pointer-events: none;
  transition: .5s;
}
.input-group input:focus ~ label,
.input-group input:valid ~ label {
  top: -20px;
  left: 0;
  color: #03e9f4;
  font-size: 12px;
}`
  }
];
