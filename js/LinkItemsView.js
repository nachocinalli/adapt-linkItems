import components from 'core/js/components';
import data from 'core/js/data';
import notify from 'core/js/notify';
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
      this.$('.linkitems__widget').on(
        'onscreen.animate',
        this.checkIfOnScreen.bind(this)
      );
    }

    if (this.model.get('_setCompletionOn') !== 'inview') return;
    this.setupInviewCompletion();
  }

  checkIfOnScreen({ currentTarget }, { percentInviewVertical }) {
    if (percentInviewVertical < this.model.get('_percentInviewVertical')) {
      return;
    }

    $(currentTarget).off('onscreen.animate');
    this.animateItems();
  }

  animateItems() {
    const _transitionSpeed = this.model.get('_transitionSpeed');
    this.model.getChildren().forEach((item, index) => {
      setTimeout(() => item.set('_isAnimated', true), _transitionSpeed * index);
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
      const model = data.findById(_adaptModelId);

      if (model) {
        const View = components.getViewClass(model);
        const view = new View({ model });
        notify.popup({ _view: view, _classes: itemModel.get('_classes') });
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
