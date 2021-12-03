import Adapt from 'core/js/adapt';
import ComponentView from 'core/js/views/componentView';

class LinkItemsView extends ComponentView {
  className() {
    let classes = super.className();

    if (this.model.get('_animateItems')) {
      classes += ' is-animated';
    }

    return classes;
  }

  preRender() {
    this.onClick = this.onClick.bind(this);
  }

  postRender() {
    this.$('.linkitems__widget').imageready(() => {
      this.setReadyStatus();
    });

    if (this.model.get('_animateItems')) {
      this.$('.linkitems__widget').on('onscreen.animate', this.checkIfOnScreen.bind(this));
    }

    if (this.model.get('_setCompletionOn') !== 'inview') return;
    this.setupInviewCompletion();

  }

  checkIfOnScreen({ currentTarget }, { percentInviewVertical }) {
    if (percentInviewVertical < this.model.get('_percentInviewVertical')) return;

    $(currentTarget).off('onscreen.animate');
    this.animateItems();
  }

  animateItems() {
    const _transitionSpeed = this.model.get('_transitionSpeed');
    this.model.getChildren().forEach((item, index) => {
      setTimeout(() => item.set('_isAnimated', true), (_transitionSpeed * index));
    });
  }

  onClick(event) {
    const $item = $(event.currentTarget).closest('.linkitems__item');
    const itemIndex = $item.data('index');
    const itemModel = this.model.getItem(itemIndex);
    const _isAdaptModel = itemModel.get('_isAdaptModel');

    if (_isAdaptModel) {
      event.preventDefault();
      const _adaptModelId = itemModel.get('_adaptModelId');
      if (Adapt.findById(_adaptModelId)) {
        Adapt.notify.popup({ _id: _adaptModelId, _classes: itemModel.get('_classes') });
      }
    }
    this.model.toggleItemsState(itemIndex);
  }

  remove() {
    this.$('.linkitems__widget').off('onscreen.animate');
    super.remove();
  }
}
LinkItemsView.template = 'link-items.jsx';

export default LinkItemsView;
