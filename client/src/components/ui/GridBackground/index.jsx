const GridBackground = ({ children }) => {
  return (
    <div className="w-full bg-black text-white bg-dot-white/[0.2] relative">
      <div className="absolute pointer-events-none inset-0 bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_60%,black)]"></div>
      {children}
    </div>
  );
};
export default GridBackground;
