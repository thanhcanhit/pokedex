export const handleImageError = (
	event: React.SyntheticEvent<HTMLImageElement, Event>
) => {
  console.log('handle');
	event.currentTarget.onerror = null;
	event.currentTarget.src = "/errorImg/jpg";
};
