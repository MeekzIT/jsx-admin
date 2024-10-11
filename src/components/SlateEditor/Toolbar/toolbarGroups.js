const toolbarGroups = [
  [
    {
      id: 2,
      format: "fontSize",
      type: "dropdown",
      options: [
        { text: "Small", value: "small" },
        { text: "Normal", value: "normal" },
        { text: "Medium", value: "medium" },
        { text: "Huge", value: "huge" },
      ],
    },
  ],
  [
    {
      id: 3,
      format: "bold",
      type: "mark",
    },
    {
      id: 4,
      format: "italic",
      type: "mark",
    },
    {
      id: 5,
      format: "underline",
      type: "mark",
    },
    {
      id: 6,
      format: "strikethrough",
      type: "mark",
    },
  ],
  [
    {
      id: 7,
      format: "color",
      type: "color-picker",
    },
    {
      id: 8,
      format: "bgColor",
      type: "color-picker",
    },
  ],

  [
    {
      id: 11,
      format: "headingOne",
      type: "block",
    },
    {
      id: 12,
      format: "headingTwo",
      type: "block",
    },
    {
      id: 13,
      format: "headingThree",
      type: "block",
    },
    {
      id: 14,
      format: "blockquote",
      type: "block",
    },
  ],
  [
    {
      id: 15,
      format: "orderedList",
      type: "block",
    },
    {
      id: 16,
      format: "unorderedList",
      type: "block",
    },
  ],
  [
    {
      id: 17,
      format: "alignLeft",
      type: "block",
    },
    {
      id: 18,
      format: "alignCenter",
      type: "block",
    },
    {
      id: 19,
      format: "alignRight",
      type: "block",
    },
  ],
];

export default toolbarGroups;
