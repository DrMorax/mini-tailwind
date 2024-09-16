// Used to escape certain characters that could break the style sheet.
function escapeClassName(className) {
  return className
    .replace(/\[/g, "\\[") // Escape opening square bracket
    .replace(/\]/g, "\\]") // Escape closing square bracket
    .replace(/\(/g, "\\(") // Escape opening round bracket
    .replace(/\)/g, "\\)") // Escape closing round bracket
    .replace(/\./g, "\\.") // Escape dots
    .replace(/,/g, "\\,") //  Escape commas
    .replace(/#/g, "\\#"); // Escape hash symbol
}

// Mapping out each className to the corresponding CSS property(can be customized too).
function getCSSProperty(property) {
  const propertyMap = {
    "h-": "height",
    "w-": "width",
    "bg-": "background-color",
    "p-": "padding",
    "px-": "padding-left, padding-right",
    "py-": "padding-top, padding-bottom",
    "m-": "margin",
    "mx-": "margin-left, margin-right",
    "my-": "margin-top, margin-bottom",
    "text-": "font-size",
    "leading-": "line-height",
    "border-": "border-width",
    "rounded-": "border-radius",
    "opacity-": "opacity",
    "top-": "top",
    "bottom-": "bottom",
    "left-": "left",
    "right-": "right",
  };
  return propertyMap[property] || null;
}

// Generate the styles on the client side.
function generateDynamicStyles() {
  const dynamicStyles = [];
  const elements = document.querySelectorAll('*[class*="["]');

  elements.forEach((el) => {
    // Convert the class list of the current element to an array.
    const classList = [...el.classList];

    // Iterate over each class name in the class list.
    classList.forEach((cls) => {
      // Check if the class name contains square brackets.
      if (cls.includes("[") && cls.includes("]")) {
        // Split the class name by the square brackets to separate property and value.
        const [property, value] = cls.split(/\[(.*)\]/).filter(Boolean);

        // Retrieve the corresponding CSS property for the class prefix.
        const cssProperty = getCSSProperty(property);

        // If a valid CSS property is found.
        if (cssProperty) {
          // Escape special characters in the class name for CSS usage.
          const escapedClass = escapeClassName(cls);

          // Split the CSS property into multiple properties if necessary (e.g., padding).
          const properties = cssProperty.split(", ");

          // Create a CSS rule for each property and add it to the dynamicStyles array.
          properties.forEach((prop) => {
            dynamicStyles.push(`.${escapedClass} { ${prop}: ${value}; }`);
          });
        }
      }
    });
  });

  // Create a styles tag to hold the generated styles
  const styleElement = document.createElement("style");
  styleElement.innerHTML = dynamicStyles.join(" ");

  document.head.appendChild(styleElement);
}

generateDynamicStyles();
