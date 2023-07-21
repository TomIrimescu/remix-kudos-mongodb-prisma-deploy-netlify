import { User, Kudo } from '@prisma/client';
import { UserCircle } from './user-circle';
import { emojiMap } from '~/utils/constants';

interface KudoWithRecipient extends Kudo {
  recipient: User;
}

export function RecentBar({ kudos }: { kudos: KudoWithRecipient[] }) {
  return (
    <div className='w-[120px] border-l-2 border-l-yellow-300 flex-col items-center hidden md:inline-flex lg:inline-flex'>
      <h2 className='text-xl text-yellow-300 font-semibold my-6 text-center'>
        Recent <br />
        Kudos
      </h2>
      <div className='h-full flex flex-col gap-y-10 mt-10'>
        {kudos.map((kudo) => (
          <div className='h-24 relative' key={kudo.recipient.id}>
            <UserCircle
              profile={kudo.recipient.profile}
              className='w-20 h-20'
            />
            <div className='h-8 w-8 text-3xl bottom-2 right-4 rounded-full absolute flex justify-center items-center'>
              {emojiMap[kudo?.style?.emoji || 'THUMBSUP']}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
