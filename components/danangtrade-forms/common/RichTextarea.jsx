import React from 'react';
import { PropTypes } from 'prop-types';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { ShowIf } from 'components/utils';
import {validatable} from 'components/utils';
import shortid from 'shortid';
import style from './_textarea.scss';
import {Articles} from 'api';

class RichTextarea extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      value: (typeof this.props.value != "undefined" && this.props.value != null) ? this.props.value.toString() : '',
      isValid: true,
      validationText: this.props.validationText
    }

    this.id = shortid();

    this.state = {
      editorState: this.contentState(this.props.value)
    }
  }

  contentState(value) {
    const contentBlock = htmlToDraft(value);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);

      return editorState;
    } else {
      return EditorState.createEmpty();
    }
  }

  value() {
    return this.state.value;
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value != nextProps.value) {
      let value = (typeof nextProps.value != "undefined" && nextProps.value != null) ? nextProps.value.toString() : '';

      this.setState({
        value: value,
        editorState: this.contentState(value)
      });

      if (nextProps.required && value.trim()) {
        this.setState({
          isValid: true
        });
      }
    }
  }

  classNames() {
    if (this.state.isValid) {
      return 'form-group';
    } else {
      return 'form-group has-error';
    }
  }

  focus() {
    this.input.focus();
  }

  onEditorStateChange(editorState) {
    this.setState({
      editorState
    }, ()=> {
      let data = {
        target: {
          value: draftToHtml(convertToRaw(editorState.getCurrentContent()))
        }
      }
      this.props.onChange(data);
    });
  };

  render() {
    const { editorState } = this.state;

    return (
      <div className={`${this.props.className} ` + this.classNames() }>
        <ShowIf condition={this.props.label != ''}>
          <label>
            { this.props.label }
            <ShowIf condition={this.props.required}>
              <span className="text-required">&nbsp;*</span>
            </ShowIf>
          </label>
        </ShowIf>
        <ShowIf condition={this.props.heading != null}>
          <this.props.heading/>
        </ShowIf>
        <Editor
          editorState={editorState}
          ref={(input) => {this.input = input}}
          wrapperClassName="demo-wrapper"
          editorClassName={this.props.inputClassName}
          onEditorStateChange={this.onEditorStateChange.bind(this)}
          style={{width: this.props.width, height: this.props.height}}
          rows={this.props.rows}
          maxLength={this.props.maxLength}
          toolbar={{
            ...this.props.toolbar,
            image: {
              ...this.props.toolbar.image,
              uploadCallback: this.props.uploadCallback
            }
          }}
        />

        <ShowIf condition={!this.state.isValid}>
          <span className="help-block">{this.state.validationText}</span>
        </ShowIf>
      </div>
    );
  }
}

RichTextarea.propTypes = {
  rows: PropTypes.number,
  type: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  maxLength: PropTypes.number,
  width: PropTypes.string,
  height: PropTypes.string,
  heading: PropTypes.any,
  toolbar: PropTypes.object
}

RichTextarea.defaultProps = {
  rows: 10,
  type: 'text',
  className: 'input-group',
  inputClassName: '',
  label: '',
  onChange: function() {
    console.log('Need to assign onChange method');
  },
  placeholder: null,
  required: false,
  maxLength: 255,
  name:'',
  validationText: 'error',
  width: '100%',
  height: 'auto',
  heading: null,
  toolbar: {
    options: ['inline', 'list', 'textAlign', 'link', 'embedded', 'image', 'blockType', 'fontSize', 'fontFamily'],
      embedded: {
      defaultSize: {
        height: 400,
        width: 'auto',
      },
      alignmentEnabled: true
    },
    image: {
      urlEnabled: true,
      uploadEnabled: true,
      alignmentEnabled: true,
      uploadCallback: function() {

      },
      inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
      alt: { present: false, mandatory: false },
      defaultSize: {
        height: 'auto',
        width: 'auto',
      },
    }
  }
}

export default RichTextarea;
