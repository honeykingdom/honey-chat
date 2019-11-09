import { pathOr, toPairs, map, pipe, filter } from 'ramda';

const createBadge = ({
  title,
  description,
  image_url_1x: imageUrl1x,
  image_url_2x: imageUrl2x,
  image_url_4x: imageUrl4x,
}) => ({
  alt: title,
  label: description,
  src: imageUrl1x,
  srcSet: `${imageUrl1x} 1x, ${imageUrl2x} 2x, ${imageUrl4x} 4x`,
});

const getMessageBadges = (badges, globalBadges, channelBadges) => {
  const mapBadges = ([name, version]) => {
    const badge =
      pathOr(false, [name, 'versions', version], channelBadges) ||
      pathOr(false, [name, 'versions', version], globalBadges);

    return badge ? createBadge(badge) : false;
  };

  return pipe(
    toPairs,
    map(mapBadges),
    filter(Boolean),
  )(badges);
};

export default getMessageBadges;
