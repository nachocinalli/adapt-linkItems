import components from 'core/js/components';
import LinkItemsModel from './LinkItemsModel';
import LinkItemsView from './LinkItemsView';

export default components.register('linkItems', {
  model: LinkItemsModel,
  view: LinkItemsView
});
