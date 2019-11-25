import CustomScrollbar from 'react-scrollbars-custom';
import styled from 'styled-components';

const Scrollbar = styled(CustomScrollbar).attrs({
  disableTracksWidthCompensation: true,
})`
  overflow-y: auto;

  .ScrollbarsCustom-Content {
    padding: 0 !important;
  }

  .ScrollbarsCustom-TrackY {
    background: none !important;
  }

  .ScrollbarsCustom-ThumbY {
    margin-left: auto;
    margin-right: auto;
    width: 6px !important;
  }
`;

export default Scrollbar;
