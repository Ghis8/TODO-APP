
import '../utils/loader.css';

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader"></div>
      <span className='font-bold absolute text-md text-gray-500 animate-pulse '>
        TODO
    </span>
    </div>
  );
};

export default Loader;