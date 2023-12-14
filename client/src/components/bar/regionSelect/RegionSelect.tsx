import {FormControl, InputLabel, Select, MenuItem} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import {selectConrol, setRegion} from '../../../redux/controlSlice';
import {menuItems} from './menuItems';
import {styles} from './styles';

const RegionSelect = () => {
  const dispatch = useAppDispatch();
  const {region} = useAppSelector(selectConrol);

  return (
    <FormControl sx={styles.control}>
      <InputLabel sx={styles.label}>Region</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        value={`${region}`}
        label="Region"
        onChange={(e) => dispatch(setRegion(+e.target.value))}
        sx={styles.select}
      >
        {menuItems.map((item, i) => (
          <MenuItem value={item.value} key={i}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default RegionSelect;
