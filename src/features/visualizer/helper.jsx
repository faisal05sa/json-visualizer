// There are the css classes used by Monaco Editor for different data types. e.g;
// mtk4, mtk5, mtk6, mtk7, ...
// We are using the same classes.
const THEMES = {
  light: {
    key: "mtk20",
    str: "text-info",
    num: "mtk7",
    null: "text-danger",
    boolean: "mtk5",
  },
  dark: {
    key: "mtk4",
    str: "text-info",
    num: "mtk6",
    null: "text-danger",
    boolean: "mtk5",
  },
};

function getCssForTheme(isDarkMode) {
  const theme = isDarkMode ? THEMES.dark : THEMES.light;
  function getCss(value_type) {
    return theme[value_type];
  }
  return getCss;
}

export function isExpandable(data) {
  if (data === null) {
    return false;
  }
  if (Array.isArray(data)) {
    return data.length > 0;
  } else if (typeof data === "object") {
    return Object.keys(data).length > 0;
  }
  return false;
}

export function visualizeSimpleContents(data, isDarkMode, is_heading) {
  const getCss = getCssForTheme(isDarkMode);

  function visualizeNull() {
    return <span className={getCss("null")}>null</span>;
  }

  function visualizeHeadings(data) {
    return <span className={getCss("key")}>{data}</span>;
  }

  function visualizeString(s) {
    return <span className={getCss("str")}>{s ? s : '""'}</span>;
  }

  function visualizeNumber(num) {
    return <span className={getCss("num")}>{num}</span>;
  }

  function visualizeBoolean(b) {
    return <span className={getCss("boolean")}>{b ? "true" : "false"}</span>;
  }

  if (is_heading) {
    return visualizeHeadings(data);
  } else if (data === null) {
    return visualizeNull();
  } else if (typeof data === "string") {
    return visualizeString(data);
  } else if (typeof data === "number") {
    return visualizeNumber(data);
  } else if (data === false || data === true) {
    return visualizeBoolean(data);
  } else if (Array.isArray(data)) {
    // An "Empty" Array found
    if (data.length < 1) {
      return "[]";
    }
  } else if (typeof data === "object") {
    // An "Empty" Object found
    if (Object.keys(data).length < 1) {
      return "{}";
    }
  }
  if (typeof data === "symbol") {
    // any React symbol that is ready to render
    return data;
  }

  console.log(typeof data + " to be displayed");
  return <p>Some Data of type {typeof data}</p>;
}
