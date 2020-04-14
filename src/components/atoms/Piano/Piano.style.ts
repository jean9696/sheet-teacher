import styled from 'styled-components'

import { palette } from '@habx/ui-core'

export const PianoContainer = styled.ul`
  margin: 0;
  padding: 0;
  height: 18.875em;
  position: relative;
  border-top: 1px solid ${palette.darkBlue[300]};
`

export const Key = styled.li`
  margin: 0;
  list-style: none;
  position: relative;
  float: left;
  &[data-black='false'] {
    color: ${palette.darkBlue[700]};

    height: 16em;
    width: 4em;
    z-index: 1;
    border-left: 1px solid #bbb;
    border-bottom: 1px solid #bbb;
    border-radius: 0 0 5px 5px;
    box-shadow: -1px 0 0 rgba(255, 255, 255, 0.8) inset, 0 0 5px #ccc inset,
      0 0 3px rgba(0, 0, 0, 0.2);
    background: linear-gradient(to bottom, #eee 0%, #fff 100%);
    &[data-active='true'] {
      border-top: 1px solid #777;
      border-left: 1px solid #999;
      border-bottom: 1px solid #999;
      box-shadow: 2px 0 3px rgba(0, 0, 0, 0.1) inset,
        -5px 5px 20px rgba(0, 0, 0, 0.2) inset, 0 0 3px rgba(0, 0, 0, 0.2);
      background: linear-gradient(to bottom, #fff 0%, #e9e9e9 100%);
    }
  }
  &[data-black='true'] {
    color: ${palette.darkBlue[200]};
    height: 8em;
    width: 2em;
    margin: 0 0 0 -1em;
    z-index: 2;
    border: 1px solid #000;
    border-radius: 0 0 3px 3px;
    box-shadow: -1px -1px 2px rgba(255, 255, 255, 0.2) inset,
      0 -5px 2px 3px rgba(0, 0, 0, 0.6) inset, 0 2px 4px rgba(0, 0, 0, 0.5);
    background: linear-gradient(45deg, #222 0%, #555 100%);
    &[data-active='true'] {
      box-shadow: -1px -1px 2px rgba(255, 255, 255, 0.2) inset,
        0 -2px 2px 3px rgba(0, 0, 0, 0.6) inset, 0 1px 2px rgba(0, 0, 0, 0.5);
      background: linear-gradient(to right, #444 0%, #222 100%);
    }
  }
  &[data-black='true'] + [data-black='false'] {
    margin: 0 0 0 -1em;
  }
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 0 0 8px;
`
