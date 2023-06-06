# redux jest 测试

在进行 Redux 组件的 Jest 测试时，你可以采取以下步骤：

安装必要的依赖项：确保你的项目中已经安装了 redux、react-redux 和 redux-mock-store 等必要的依赖项。你可以使用 npm 或 yarn 进行安装。

创建测试文件：在与组件文件相同的目录中创建一个新的测试文件，文件名类似于 ComponentName.test.js。

导入依赖项：在测试文件的开头，导入所需的依赖项。这可能包括组件本身、Redux 相关的内容和测试所需的其他工具。

设置测试环境：如果你的组件使用了 React，可以在测试文件顶部添加以下代码，以设置 React 测试环境：

```jsx
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-xx'; // 选择适合你的 React 版本的适配器

configure({ adapter: new Adapter() });
```

编写测试用例：根据你的组件功能编写测试用例。例如，你可以测试组件的渲染、Redux 状态的更新、事件处理函数等。以下是一个简单的例子：

```jsx
import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import ComponentName from '../ComponentName';

describe('ComponentName', () => {
  const mockStore = configureStore([]);
  let store;
  let component;

  beforeEach(() => {
    store = mockStore({
      // 设置你的初始 Redux 状态
      // 这里可以模拟你的 Redux 存储
    });
    component = shallow(
      <Provider store={store}>
        <ComponentName />
      </Provider>
    );
  });

  it('should render correctly', () => {
    expect(component).toMatchSnapshot();
  });

  it('should handle button click', () => {
    // 模拟按钮点击
    component.find('button').simulate('click');

    // 断言你预期的结果
    expect(store.getActions()).toContainEqual({
      // 预期的 Redux action
    });
  });

  // 其他测试用例...
});
```

上述示例中，我们使用了 enzyme 库来浅渲染组件，并使用 redux-mock-store 来模拟 Redux 存储。我们还使用了 Provider 组件将 Redux 存储传递给被测试组件。

运行测试：在命令行中运行你的测试脚本，例如 npm test 或 yarn test，以执行测试并查看结果。
请注意，这只是一个基本的示例，你可以根据你的实际需求和组件功能来编写更全面的测试用例。还可以使用其他工具和库来增强你的测试，如 redux-saga-test-plan 来测试 Redux-Saga 等。
