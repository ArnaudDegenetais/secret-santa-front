import Tree from './Tree';
import './Tree.css';

const TreeLoader: React.FC = () => {
  return (
    <div className="container">
      <div className="glassSphere"></div>
      <Tree />
    </div>
  );
}

export default TreeLoader;