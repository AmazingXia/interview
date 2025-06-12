import React, { useState, useEffect } from "react";

function useUpdateInput(initialValue) {
  const [value, setValue] = useState(initialValue);
  return {
    value,
    onChange: (event) => setValue(event.target.value),
  };
}

function App() {
  const usernameInput = useUpdateInput('');
  const passwordInput = useUpdateInput('');
  const submitForm = (event) => {
    event.preventDefault();
    console.log(usernameInput.value);
    console.log(passwordInput.value);
  };

  return (
    <form onSubmit={submitForm}>
      <input type="text" name="username" {...usernameInput} />
      <input type="password" name="password" {...passwordInput} />
      <input type="submit" />
    </form>
  );
}

export default App;