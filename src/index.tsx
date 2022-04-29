import ReactDOM from 'react-dom/client';
import Game from './components/Game';
import './index.css';

const app = ReactDOM.createRoot(document.getElementById('app') as HTMLElement);
app.render(<Game />);
