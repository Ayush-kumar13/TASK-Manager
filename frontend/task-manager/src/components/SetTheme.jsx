const SetTheme = ({ darkMode, setDarkMode }) => {

  return (
    <div className="fixed right-5 bottom-5 p-5">

      <select 
        value={darkMode ? "dark" : "light"}
        onChange={(e) => setDarkMode(e.target.value === "dark")}
      > 
      
        <option value="light">
          ☀️ Light
        </option>

        <option value="dark">
          🌙 Dark
        </option>
      </select>



    </div>
  );
};

export default SetTheme;