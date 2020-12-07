import React, { FunctionComponent } from 'react';
import axios from 'axios';
import {
  Button, Dialog, DialogTitle, DialogActions,
} from '@material-ui/core';

interface BioProps {
  handleClose: (
    i: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    check: boolean,
    type: string,
  ) => void,
  handleClickOff: (type: string) => void,
  handleTextChange: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    type: string
  ) => void,
  pic: string,
  picOpen: boolean,
}

const EditProfilePic: FunctionComponent<BioProps> = (Props: BioProps): JSX.Element => {
  const {
    handleClose,
    handleClickOff,
    picOpen,
  } = Props;

  const uploadPhoto = (photoString: any) => {
    axios.put(`/image/editProfilePic/${localStorage.userId}`, {
      data: photoString,
    })
      .then(({ data }) => {
        localStorage.setItem('profilePhoto', data);
      })
      .catch((err) => console.warn(err));
  };

  const handleFileChange = (e: any) => {
    const image = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = () => {
      uploadPhoto(reader.result);
    };
  };

  return (
    <Dialog open={picOpen} onClose={() => handleClickOff('pic')} fullWidth maxWidth="md" aria-labelledby="form-dialog-title">
      {/* <DialogTitle id="form-dialog-title">
        Something here to let you pick a new picture
      </DialogTitle> */}
      <Button
        variant="contained"
        component="label"
      >
        Update Profile Photo
        <input
          type="file"
          style={{ display: 'none' }}
          onChange={(e) => handleFileChange(e)}
        />
      </Button>
      <DialogActions>
        <Button onClick={(i) => handleClose(i, false, 'pic')} color="primary">
          Cancel
        </Button>
        <Button onClick={(i) => handleClose(i, true, 'pic')} color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProfilePic;
