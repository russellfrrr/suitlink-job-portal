const Logo = ({ src, alt }) => {
  return (
    <img
      src={src}
      alt={alt}
      className="w-10 h-10 rounded-full border-2 border-white object-cover"
    />
  );
};

export default Logo;
