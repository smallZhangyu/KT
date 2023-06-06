# testing-library/jest-dom 提供的断言

## 页面可见的场景

1. `toBeEmptyDOMElement()`，标签之间是否有可见内容， 即使是空格也会失败；
2. `toBeVisible()`，是否可见，从用户直接观察的角度看能否可见；
3. `toBeInTheDocument()`，是否存在于文档中，document.body 是否存在这个元素

## 表单验证的场景

1. `toBeDisabled()`，检查元素是否通过 disable 属性判断，而不是 aria-disabled；
2. `toBeEnabled()`，是否未被禁用，等同于 .not.toBeDisabled；
3. `toBeRequired()`，元素是否必填；
4. `toHaveFocus()`，元素是否聚焦；
5. `toBeChecked()`，checkbox 或者是 radio 是否被选中；
6. `toHaveFormValues()`，验证整体表单的值是否和预期值匹配；
7. `toHaveValue()`，与 `toHaveFormValues` 类似，不过不同的是 toHaveValue 验证某个单独的表单元素，而不是全部。

## 代码层面验证的场景

1. `toHaveAttribute('aria-hidden')`，匹配元素是否具备某个值的属性；
2. `toHaveClass('hidden')`，匹配元素在类属性中是否包含某个类；
3. `toHaveStyle('display: none')`，匹配元素是否具有对应样式，需要注意的是，这个是精准非模糊匹配，例如 `display: none` 无法匹配 `display:none;color:#fff;`。
