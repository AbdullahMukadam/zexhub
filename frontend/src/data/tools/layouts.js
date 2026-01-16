export const layoutPresets = [
  { 
    name: 'Row Layout', 
    type: 'flexbox', 
    direction: 'row', 
    justify: 'flex-start', 
    align: 'center', 
    gap: 16, 
    wrap: 'nowrap' 
  },
  { 
    name: 'Column', 
    type: 'flexbox', 
    direction: 'column', 
    justify: 'flex-start', 
    align: 'stretch', 
    gap: 16, 
    wrap: 'nowrap' 
  },
  { 
    name: 'Centered', 
    type: 'flexbox', 
    direction: 'row', 
    justify: 'center', 
    align: 'center', 
    gap: 16, 
    wrap: 'nowrap' 
  },
  { 
    name: 'Space Between', 
    type: 'flexbox', 
    direction: 'row', 
    justify: 'space-between', 
    align: 'center', 
    gap: 0, 
    wrap: 'nowrap' 
  },
  { 
    name: 'Grid 3x3', 
    type: 'grid', 
    cols: 3, 
    rows: 3, 
    gap: 16 
  },
  { 
    name: 'Grid 2x4', 
    type: 'grid', 
    cols: 2, 
    rows: 4, 
    gap: 20 
  },
  { 
    name: 'Gallery', 
    type: 'grid', 
    cols: 4, 
    rows: 2, 
    gap: 8 
  },
  { 
    name: 'Sidebar', 
    type: 'grid', 
    cols: 4, // Representing a layout concept, user might need to adjust track sizes manually in CSS but this sets a base
    rows: 1, 
    gap: 24 
  }
];
