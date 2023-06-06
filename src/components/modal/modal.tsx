import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

interface Props {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  dark?: boolean; // Added dark prop
}

export default function ConfirmationDialog({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  dark = false, // Default to false
}: Props) {
  const cancelButtonRef = useRef(null);

  const bgClass = dark ? "bg-gray-700" : "bg-white";
  const textClass = dark ? "text-gray-100" : "text-gray-900";

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className={`relative z-10 ${bgClass}`}
        initialFocus={cancelButtonRef}
        onClose={onCancel} // Changed to use onCancel
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className={`fixed inset-0 ${
              dark ? "bg-black bg-opacity-75" : "bg-gray-500 bg-opacity-75"
            } transition-opacity`}
          />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className={`relative transform overflow-hidden rounded-lg ${bgClass} ${textClass}  shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg`}
              >
                <div className={`px-4 pt-5 pb-4 sm:p-6 sm:pb-4 ${bgClass}`}>
                  <div className="sm:flex sm:items-start">
                    <div
                      className={`mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${
                        dark ? "bg-red-500" : "bg-red-100"
                      } sm:mx-0 sm:h-10 sm:w-10`}
                    >
                      <ExclamationTriangleIcon
                        className={`h-6 w-6 ${
                          dark ? "text-white" : "text-red-600"
                        }`}
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className={`text-base font-semibold leading-6 ${textClass}`}
                      >
                        {title}
                      </Dialog.Title>
                      <div className={`mt-2 ${textClass}`}>
                        <p className="text-sm">{message}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className={`px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 ${bgClass}`}
                >
                  <button
                    type="button"
                    className={`inline-flex justify-center w-full rounded-md ${
                      dark
                        ? "bg-red-500 px-3 py-2 text-sm font-semibold text-white hover:bg-red-400"
                        : "bg-red-600 px-3 py-2 text-sm font-semibold text-white hover:bg-red-500"
                    } shadow-sm sm:ml-3 sm:w-auto`}
                    onClick={onConfirm} // Changed to use onConfirm
                  >
                    Confirm
                  </button>
                  <button
                    type="button"
                    className={`mt-3 inline-flex justify-center w-full rounded-md ${
                      dark
                        ? "bg-gray-600 px-3 py-2 text-sm font-semibold text-gray-100 hover:bg-gray-500"
                        : "bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    } sm:mt-0 sm:w-auto`}
                    onClick={onCancel} // Changed to use onCancel
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
