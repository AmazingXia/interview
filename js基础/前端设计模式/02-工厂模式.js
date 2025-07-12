// 🧱 2. 工厂模式（Factory Pattern）
// ✅ 作用：用于创建对象的统一入口，解耦对象创建逻辑
// 📦 业务场景：根据接口数据类型渲染不同的 UI 卡片组件


function createComponent(type) {
  switch (type) {
    case 'image':
      return new ImageCard();
    case 'video':
      return new VideoCard();
    case 'text':
      return new TextCard();
  }
}

// 使用
const data = [{ type: 'image' }, { type: 'text' }];
data.forEach(item => {
  const card = createComponent(item.type);
  card.render();
});
