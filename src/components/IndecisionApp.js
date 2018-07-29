import React from 'react';

// Components Imports
import AddOption from './AddOption';
import Action from './Action';
import Header from './Header';
import Options from './Options';
import OptionModal from './OptionModal';


class IndecisionApp extends React.Component {

    state = {
      options: [],
      selectedOption: undefined
    };

    handleRemoveAll = () => {
      this.setState(() => ({ options: [] }));
    };
  
    handleRemoveOption = (optionToRemove) => {
      this.setState((prevState) => ({
        options: prevState.options.filter((option) => optionToRemove !== option)
      }));
    };
  
    handlePick = () => {
      const optionIndex = Math.floor(Math.random() * this.state.options.length);
      const option = this.state.options[optionIndex];
      
      this.setState(() => ({
        selectedOption: option
      }));
    };
  
    handleAddOption = (option) => {
  
      if(!option) {
        return 'Enter valid value to add item';
      }
      else if (this.state.options.indexOf(option) > -1) {
        return 'This option already exists';
      }
  
      this.setState((prevState) => ({
        options: prevState.options.concat([option])
      }));
    };

    handleSelectedOption = () => {
      this.setState(() => ({
        selectedOption: undefined
      }));
    };

    // Life-Cycle Methods
    componentDidMount() {
      try {
        const json = localStorage.getItem('options');
        const options = JSON.parse(json);
  
        if (options) {
          this.setState(() => ({ options: options }));
        }
      } catch (e) {
        // Do nothing
      }
    }
  
    componentDidUpdate(prevProps, prevState) {
      if (prevState.options.length !== this.state.options.length) {
        const json = JSON.stringify(this.state.options);
        localStorage.setItem('options', json);
      }
    }
  
    render() {
      const subtitle = 'Put your life in the hands of a computer';
      
      return (
        <div>
          <Header 
            subtitle={subtitle}
          />
          <div className='container'>
            <Action 
              hasOptions={this.state.options.length > 0}
              handlePick={this.handlePick}
            />
            <div className='widget'>
              <Options 
                options={this.state.options}
                handleRemoveAll={this.handleRemoveAll}
                handleRemoveOption={this.handleRemoveOption}
              />
              <AddOption 
                handleAddOption={this.handleAddOption}
              />
            </div>
          </div>

          <OptionModal 
            selectedOption={this.state.selectedOption}
            handleSelectedOption={this.handleSelectedOption}
          />
        </div>
      );
    }
}

export default IndecisionApp;