import React from 'react';

class ImagePopup extends React.Component {
render(){
    if (this.props.card !== null) {
    return(
        <section className="popup popup_type_image popup_opened" id="image-viewer">
        <figure className="popup__figure">
          <button type="button" onClick={this.props.onClosePopup} className="popup__close-button popup__close-button_parent-corners_straight"/>
          <img className="popup__image" src={this.props.card?.link} alt={this.props.card?.name} />
          <figcaption className="popup__caption">{this.props.card?.name}</figcaption>
        </figure>
      </section>
    );
  } else {
    return(
    <section className="popup popup_type_image" id="image-viewer">

    </section>
    );
  }
}
}
export default ImagePopup;