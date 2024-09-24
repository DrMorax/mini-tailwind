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

function getCSSProperty(property) {
  const propertyMap = {
    "h-": "height",
    "w-": "width",
    "bg-": "background-color",
    "p-": "padding",
    "pl-": "padding-left",
    "pr-": "padding-right",
    "pt-": "padding-top",
    "pb-": "padding-bottom",
    "px-": "padding-left, padding-right",
    "py-": "padding-top, padding-bottom",
    "m-": "margin",
    "ml-": "margin-left",
    "mr-": "margin-right",
    "mt-": "margin-top",
    "mb-": "margin-bottom",
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

const breakpoints = {
  sm: "(min-width: 640px)",
  md: "(min-width: 768px)",
  lg: "(min-width: 1024px)",
  xl: "(min-width: 1280px)",
};

function generateDynamicStyles() {
  const dynamicStyles = [];
  const elements = document.querySelectorAll('*[class*="["]');

  elements.forEach((el) => {
    const classList = [...el.classList];

    classList.forEach((cls) => {
      const hasBreakpoint = cls.includes(":");
      let breakpoint = null;

      if (hasBreakpoint) {
        [breakpoint, cls] = cls.split(":");
      }

      if (cls.includes("[") && cls.includes("]")) {
        const [property, value] = cls.split(/\[(.*)\]/).filter(Boolean);
        const cssProperty = getCSSProperty(property);

        if (cssProperty) {
          const escapedClass = escapeClassName(cls);
          const properties = cssProperty.split(", ");

          properties.forEach((prop) => {
            const rule = `.${escapedClass} { ${prop}: ${value}; }`;

            if (hasBreakpoint && breakpoints[breakpoint]) {
              dynamicStyles.push(
                `@media ${breakpoints[breakpoint]} { .${breakpoint}\\:${escapedClass} { ${prop}: ${value}; } }`
              );
            } else {
              dynamicStyles.push(rule);
            }
          });
        }
      }
    });
  });

  const styleElement = document.createElement("style");
  styleElement.innerHTML = dynamicStyles.join(" ");

  document.head.appendChild(styleElement);
}

generateDynamicStyles();
