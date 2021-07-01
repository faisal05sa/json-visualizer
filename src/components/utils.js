import { Zoom, toast } from "react-toastify";
const toast_options = {
  position: "top-center",
  transition: Zoom,
  autoClose: 1000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: false,
};

export const notification = {
  success: (msg) => toast.success(msg, toast_options),
  warning: (msg) => toast.warning(msg, toast_options),
  error: (msg) => toast.error(msg, toast_options),
};

// Intersection for array of arrays
function intersection(arr) {
  if (arr.length < 1) {
    return [];
  }

  console.log("Find intersection of arr: ", arr);
  let res = arr[0];
  arr.slice(1).map((sub_arr) => {
    res = res.filter((x) => sub_arr.includes(x));
    return null;
  });
  return res;
}

// given two arrays,
// X = [x1, x2, x3, ...]
// Y = [y1, y2, y3, ...]
// It will return [ [x1, y1], [x2, y2], [x3, y3], ...]
// function zip(X, Y) {
//   return X.map((xi, i) => [xi, Y[i]]);
// }

function getTypeOf(data) {
  if (data === null) {
    return "null";
  }
  if (Array.isArray(data)) {
    return "Array";
  }
  return typeof data;
}

// function isArrayOfObjects(arr) {
//   let is_array_of_obj = arr.every((x) => getTypeOf(x) === "object");
//   return is_array_of_obj && arr.length > 1;
// }

function isObjectOfObjects(obj) {
  if (getTypeOf(obj) === "object") {
    const keys = Object.keys(obj);
    let is_obj_of_obj = keys.every((key) => getTypeOf(obj[key]) === "object");
    if (!is_obj_of_obj) {
      return false;
    }
    const common_keys = intersection(keys.map((key) => Object.keys(obj[key])));
    const are_common_keys_from_array = common_keys.every((key) =>
      key.startsWith("index__")
    );
    return (
      keys.length > 1 && common_keys.length > 0 && !are_common_keys_from_array
    );
  }
  return false;
}

// function transformObj(obj) {
//   const object_type = getTypeOf(obj);
//   if (object_type === "Array") {
//     return obj.map((x, index) => ["int__" + index, x]);
//   }
//   if (object_type === "object") {
//     return obj.entries.map(([key, value]) => [key, value]);
//   }
// }

// function arr_to_table(arr) {
//   let table = arr.map((value, key) => [
//     { path_key: key, value: key },
//     { path_key: "", value: value },
//   ]);
//   return { headings: ["[index]", ""], table: table };
// }

function obj_to_table(obj) {
  let table = Object.entries(obj).map(([key, value]) => {
    if (key.startsWith("index__")) {
      key = parseInt(key.substr(7));
    }

    return [
      { path_key: key, value: key },
      { path_key: "", value: value },
    ];
  });
  return { headings: [], table: table };
}

// let { headings, table } = arr_to_table([10, 13, 123, 43]);
// console.log("HEADINGS", headings);
// table.map((row) => {
//   console.log("ROW", row);
// });

// let { headings, table } = obj_to_table({ a: "b", c: "d", e: "123" });
// console.log("HEADINGS ", headings);
// table.map((row) => {
//   console.log("ROW", row);
// });

// function arr_of_obj_to_table(arr) {
//   // find unique keys from the array of objects
//   let keys = [...new Set(arr.flatMap((obj) => Object.keys(obj)))];
//   let table = [];
//   arr.forEach(function (obj, row_index) {
//     let row = [{ path_key: row_index, value: row_index }];
//     keys.forEach(function (key) {
//       if (key in obj) {
//         row.push({ path_key: key, value: obj[key] });
//       } else {
//         row.push(null);
//       }
//     });
//     table.push(row);
//   });
//   return { headings: ["[index]"].concat(keys), table: table };
// }

// let { headings, table } = arr_of_obj_to_table([
//   { a: "b", b: "c" },
//   { a: "b", c: "c" },
//   { a: "b" },
// ]);
// console.log("HEADINGS", headings);
// table.map((row) => {
//   console.log("ROW", row);
// });

function obj_of_obj_to_table(obj) {
  // find unique keys from the object of objects
  let keys = Object.entries(obj).flatMap(([_, sub_obj]) =>
    Object.keys(sub_obj)
  );
  keys = [...new Set(keys)];

  let table = [];
  Object.entries(obj).forEach(function ([main_key, sub_obj]) {
    if (main_key.startsWith("index__")) {
      main_key = parseInt(main_key.substr(7));
    }
    let row = [{ path_key: main_key, value: main_key }];
    keys.forEach(function (key) {
      if (key.startsWith("index__")) {
        key = parseInt(key.substr(7));
      }
      if (key in sub_obj) {
        row.push({ path_key: key, value: sub_obj[key] });
      } else {
        row.push(null);
      }
    });
    table.push(row);
  });
  return { headings: ["[key]"].concat(keys), table: table };
}

// const { headings, table } = obj_of_obj_to_table({
//   key1: { sub_key1: "b", sub_key2: "c" },
//   key2: { sub_key1: "b", sub_key3: "c" },
//   key3: { sub_key4: "b" },
// });
// console.log("HEADINGS", headings);
// table.map((row) => {
//   console.log("ROW", row);
// });

export function join_path(parent_path, key) {
  if (!parent_path) {
    parent_path = "root";
  }

  if (key === "" || key === "[index]") {
    return parent_path;
  }

  const current_path = typeof key === "string" ? `["${key}"]` : `[${key}]`;
  return parent_path + current_path;
}

export default function makeTable(data) {
  // if (Array.isArray(data)) {
  //   // An Array of objects
  //   if (isArrayOfObjects(data)) {
  //     return arr_of_obj_to_table(data);
  //   }
  //   // A Simple Array
  //   return arr_to_table(data);
  // } else
  if (typeof data === "object") {
    // An Object having another object as a value for each of its properties
    // i.e. A nested Object
    if (isObjectOfObjects(data)) {
      return obj_of_obj_to_table(data);
    }
    // An Simple Object
    return obj_to_table(data);
  }
}

function doesObjectIncludeText(obj, text) {
  if (obj === null) {
    return "null".includes(text);
  }
  if (typeof obj === "number" || typeof obj === "boolean") {
    return obj.toString().toLowerCase().includes(text);
  }
  if (typeof obj === "string") {
    return obj.toLowerCase().includes(text);
  }
  return "unsure";
}

export function filterObj(obj, filterText) {
  // This function will accept `obj` of type {Array/Object}
  // and will remove the elements/properties which do not include `filterText`

  // convert Array to an object so that index are preserved when some elements are filtered out.
  if (getTypeOf(obj) === "Array") {
    let new_obj = {};
    obj.forEach((x, i) => {
      new_obj["index__" + i] = x;
    });
    obj = new_obj;
  }

  if (!filterText) {
    return obj;
  }

  let filtered_obj = {};
  Object.entries(obj).forEach(([key, value]) => {
    const flag =
      doesObjectIncludeText(key, filterText) ||
      doesObjectIncludeText(value, filterText);
    if (flag === true) {
      filtered_obj[key] = value;
    } else if (flag === "unsure") {
      filtered_obj[key] = value;
      // value = filterObj(value, filterText);
      // if (Object.keys(value).length > 0) {
      //   filtered_obj[key] = value;
      // }
    }
  });
  return filtered_obj;
  // const new_table = table.map((row) => {
  //   let new_row = row.filter(function (cell) {
  //     if (cell === null) {
  //       return false;
  //     }

  //     let { value } = cell;
  //     if (value === null) {
  //       return false;
  //     }

  //     if (typeof value === "number" || typeof value === "boolean") {
  //       value = value.toString();
  //     }

  //     if (typeof value === "string") {
  //       return value.includes(filterText);
  //     }

  //     if (Array.isArray(value)) {
  //       return value.length > 0;
  //     }

  //     // Object
  //     return Object.keys(value).length > 0;
  //   });

  //   if (new_row.length > 0) {
  //     return row;
  //   }

  //   return [];
  // });

  // return new_table.filter((row) => row.length > 0);
}

// console.log(
//   filterRows(
//     [
//       [
//         [0, []],
//         [2, { a: 12 }],
//       ],
//       [[3, 25]],
//       [
//         [4, {}],
//         [5, [12]],
//       ],
//     ],
//     "5"
//   )
// );
export function truncateStrings(data, n) {
  if (getTypeOf(data) === "string") {
    if (data.length <= n) {
      return data;
    }
    return data.substr(0, n - 3) + "...";
  }
  Object.entries(data).forEach(([key, value]) => {
    data[key] = truncateStrings(value, n);
  });
  return data;
}
