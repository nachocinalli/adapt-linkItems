import Adapt from 'core/js/adapt';
import ItemModel from 'core/js/models/itemModel';
import ItemsComponentModel from 'core/js/models/itemsComponentModel';

export default class LinkItemsModel extends ItemsComponentModel {
  defaults() {
    return ItemsComponentModel.resultExtend('defaults', {
      _animateItems: false,
      _percentInviewVertical: 70,
      _transitionSpeed: 200
    });
  }

  setUpItems() {

    const items = this.get('_items') || [];
    items.forEach((item, index) => {
      item._index = index;
      if (!item._isResourceItem) return;
      const _resources = Adapt.course.get('_resources');
      if (_resources && _resources._isEnabled && _resources._resourcesItems.length > 0) {
        const _resourceItem = _resources._resourcesItems[item._resourceItemIndex];
        if (_resourceItem) {
          item.title = _resourceItem.title;
          item.body = _resourceItem.description;
          item._link = _resourceItem._link;
          item.filename = _resourceItem.filename;
          item._forceDownload = _resourceItem._forceDownload;
        }
      }
    });
    this.setChildren(new Backbone.Collection(items, { model: ItemModel }));
  }

  toggleItemsState(index) {
    const item = this.getItem(index);

    item.toggleActive();
    item.toggleVisited(true);

  }
}
