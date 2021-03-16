import { Typography } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import {
    Chip as MuiChip,
} from '@material-ui/core';
import styled from "styled-components"

export const ActiveChip = styled(MuiChip)`
  background-color: #72B754;
  color: white
`;
export const InactiveChip = styled(MuiChip)`
  background-color: #E46C49;
  color: white
`;

const theme = createMuiTheme({
    palette: {
        primary:{
            main: '#015C88'
        },
        secondary:{
            main: '#FFA802'
        }
    },
    // typography:{
    //     //fontFamily: 'Montserrat-Regular',
    //     //fontFamily: 'Raleway, Arial'
    // },
    typography: {
        fontFamily: [
            'Ubuntu',
            'sans-serif',
          ].join(','),
        fontSize: 13,
        button: {
          textTransform: "none",
          fontSize: 12,
        },
      },
})


export default theme;