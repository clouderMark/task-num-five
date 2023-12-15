import {AppBar, Container, Toolbar} from '@mui/material';
import RegionSelect from './regionSelect/RegionSelect';
import InputErrors from './inputErrors/InputErrors';
import Seed from './seedInput/Seed';

const Bar = () => (
  <Container maxWidth={false}>
    <AppBar>
      <Toolbar>
        <RegionSelect />
        <InputErrors />
        <Seed />
      </Toolbar>
    </AppBar>
  </Container>
);

export default Bar;
