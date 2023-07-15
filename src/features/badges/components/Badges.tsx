import { useAppSelector } from 'app/hooks';
import { badgesSelector } from 'features/badges/badgesSelectors';
import type { MessageTypePrivate } from 'features/messages/messagesTypes';
import createHtmlBadge from '../utils/createHtmlBadge';
import Badge from './Badge';

type Props = {
  badges: MessageTypePrivate['badges'];
};

const Badges = ({ badges }: Props) => {
  const allBadges = useAppSelector(badgesSelector);

  if (badges.length === 0) return null;

  const htmlBadges = badges
    .map((badge) => createHtmlBadge(allBadges, badge)!)
    .filter(Boolean);

  return (
    <>
      {htmlBadges.map(({ id, title, alt, src, srcSet, bgColor }) => (
        <Badge
          key={id}
          title={title}
          alt={alt}
          src={src}
          srcSet={srcSet}
          $bgColor={bgColor}
        />
      ))}
    </>
  );
};

export default Badges;
