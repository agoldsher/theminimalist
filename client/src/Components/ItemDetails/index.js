import React, {Component} from 'react';
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogButton,
} from '@material/react-dialog';
import List, {ListItem, ListItemText} from '@material/react-list';
import Radio, {NativeRadioControl} from '@material/react-radio';


class ItemDetails extends Component {
  state = {
    isOpen: false, 
    action: '', 
    selectedIndex: -1,
    choices: ['Never gonna give you up', 'Host cross buns', 'None']
   };

  isChecked = (i) => i === this.state.selectedIndex;

  render() {
    return (
      <Dialog
        onClose={(action) => this.setState({isOpen: false, action})}
        open={this.state.isOpen}>
        <DialogTitle>Chose a Phone Ringtone</DialogTitle>
        <DialogContent>
          <List 
            singleSelection 
            handleSelect={ (selectedIndex) => this.setState({selectedIndex})}
          >{this.state.choices.map((choice, i) => {
              let cleanChoice = choice.replace(/\s/g, '-');
              return (
                <ListItem key={i}>
                  <span className='mdc-list-item__graphic'>
                    <Radio>
                      <NativeRadioControl
                        name='ringtone'
                        value={choice}
                        id={cleanChoice}
                        checked={this.isChecked(i)}
                        onChange={() => {}}
                      />
                    </Radio>
                  </span>
                  <label htmlFor={cleanChoice}>
                    <ListItemText primaryText={choice}/>
                </label>
                </ListItem>
              );
            })}
          </List>
        </DialogContent>
        <DialogFooter>
          <DialogButton action='dismiss'>Cancel</DialogButton>
          <DialogButton action='confirm' isDefault>Ok</DialogButton>
        </DialogFooter>
      </Dialog>
    );
  }
}