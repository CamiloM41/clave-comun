import { useShare } from '../lib/ui';

export default function ShareButton({ title, text, hash, children, className = 'btn btn-ghost' }) {
  const openShare = useShare();
  return <button className={className} type="button" onClick={() => openShare({ title, text, hash })}>{children}</button>;
}
