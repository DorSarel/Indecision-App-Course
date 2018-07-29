console.log('App.js is running');

const app = {
  title: 'Indecision App',
  subtitle: 'Let the computer decide your next step',
  options: []
};

const onFormSubmit = (e) => {
  e.preventDefault();

  const inputText = e.target.elements.option.value;

  if (inputText) {
    app.options.push(inputText);
    e.target.elements.option.value = '';
    renderTemplate();
  }
};

const RemoveAll = () => {
  app.options = [];
  renderTemplate();
};

const onMakeDecision = () => {
  const randomNum = Math.floor(Math.random() * app.options.length);
  const option = app.options[randomNum];
  alert(option);
};

const appRoot = document.getElementById('app');

const renderTemplate = () => {
  const template = (
    <div>
      <h1>{app.title}</h1>
      {app.subtitle && <p>{app.subtitle}</p>}
      <p>{app.options.length > 0 ? 'Here are your options' : 'No options'}</p>
      <button disabled={app.options.length === 0} onClick={onMakeDecision}>What should I do?</button>
      <button onClick={RemoveAll}>Remove All</button>
      <ol>
        {
          app.options.map((option, index) => <li key={index}>{option}</li>)
        }
      </ol>
      <form onSubmit={onFormSubmit}>
        <input type='text' name='option' />
        <button>Add Option</button>
      </form>
    </div>  
  );

  ReactDOM.render(template, appRoot);
};

renderTemplate();