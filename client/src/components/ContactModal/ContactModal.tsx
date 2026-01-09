import { Contact } from '../../types';

interface ContactModalProps {
  contact: Contact;
  onClose: () => void;
}

export default function ContactModal({ contact, onClose }: ContactModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-lg max-w-2xl w-full p-6 relative" onClick={(e) => e.stopPropagation()}>

        <div className="flex flex-col items-center mb-6">
          <img
            src={`https://randomuser.me/api/portraits/${contact.gender === 'women' ? 'women' : 'men'}/${contact.avatar}.jpg`}
            alt="avatar"
            className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-lime-400"
          />
          <h2 className="text-3xl font-bold text-gray-900">
            {contact.firstName} {contact.lastName}
          </h2>
          <span className="inline-block mt-2 px-4 py-1 text-sm font-semibold text-white bg-lime-500 rounded-full">
            {contact.status}
          </span>
        </div>

        <div className="space-y-4">
          <div className="border-l-4 border-lime-400 pl-4">
            <h3 className="text-sm font-bold text-gray-500 uppercase">Email</h3>
            <a 
              href={`mailto:${contact.email}`}
              className="text-lg text-blue-600 hover:text-blue-800 hover:underline transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              {contact.email}
            </a>
          </div>

          <div className="border-l-4 border-lime-400 pl-4">
            <h3 className="text-sm font-bold text-gray-500 uppercase">Phone</h3>
            <a 
              href={`tel:${contact.phone}`}
              className="text-lg text-blue-600 hover:text-blue-800 hover:underline transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              {contact.phone}
            </a>
          </div>

          <div className="border-l-4 border-lime-400 pl-4">
            <h3 className="text-sm font-bold text-gray-500 uppercase">Gender</h3>
            <p className="text-lg text-gray-900 capitalize">{contact.gender}</p>
          </div>

          <div className="border-l-4 border-lime-400 pl-4">
            <h3 className="text-sm font-bold text-gray-500 uppercase">Favorite</h3>
            <p className="text-lg text-gray-900">{contact.favorite ? ' Yes' : 'No'}</p>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
