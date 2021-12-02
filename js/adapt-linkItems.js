import Adapt from 'core/js/adapt';
import LinkItemsModel from './LinkItemsModel';
import LinkItemsView from './LinkItemsView';

export default Adapt.register('linkItems', {
  model: LinkItemsModel,
  view: LinkItemsView
});
