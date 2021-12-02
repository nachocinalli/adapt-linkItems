import Adapt from 'core/js/adapt';
import React from 'react';
import { html, classes, compile, templates } from 'core/js/reactHelpers';

export default function LinkItems (props) {
  const {
    _columns,
    onClick
  } = props;
  const hasColumns = _columns > 1;
  return (

    <div className="component__inner linkitems__inner">

      <templates.header {...props} />

      <div className={classes([
        'component__widget', 'linkitems__widget',
        hasColumns && 'has-columns'])}>

        {props._items.map(({ title, body, _graphic, _link, filename, _forceDownload, _classes, _index, _isVisited, _isActive, _isAnimated }) =>
          <a

            className={classes([
              'linkitems__item',
              _isVisited && 'is-visited',
              _isActive && 'is-active',
              _isAnimated && 'is-animating',
              _graphic.src && 'has-image',
              _classes
            ])}
            key={_index}
            data-index={_index}
            onClick={onClick}
            href={_link}
            target='_blank'

            download={_forceDownload ? filename : false}
            style={(hasColumns && Adapt.device.screenSize === 'large' && { width: `${100 / _columns}%` }) || null} rel="noreferrer"
          >
            <div className="linkitems__item-inner">
              <div className="linkitems__item-container">
                { _graphic.src &&
              <templates.image {..._graphic}
                classNamePrefixes={['linkitems__item']}
                attributionClassNamePrefixes={['linkitems']}
              />
                }
                {title &&
              <div className="linkitems__item-title">
                {html(compile(title))}
              </div>
                }
                {body &&
              <div className="linkitems__item-body">
                {html(compile(body))}
              </div>
                }
              </div>

              <div className="linkitems__item-state">
                <div className="icon"></div>
              </div>
            </div>

          </a>
        )}

      </div>

    </div>
  );
}
