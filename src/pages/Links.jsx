import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useLinks } from "../context/LinkContext";

const PLATFORMS = [
  "GitHub",
  "YouTube",
  "LinkedIn",
  "Facebook",
  "FrontendMentor",
  "CodeWars",
  "DevTo",
  "freeCodeCamp",
];

export default function Links() {
  const { links, setLinks, showToast } = useLinks();

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      links: links.length > 0 ? links : [],
    },
    mode: "onChange",
  });

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "links",
  });

  const watchedLinks = watch("links");

  useEffect(() => {
    if (watchedLinks) {
      setLinks(watchedLinks);
    }
  }, [watchedLinks, setLinks]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    move(result.source.index, result.destination.index);
  };

  const onSubmit = (data) => {
    setLinks(data.links);
    showToast("Your changes have been successfully saved!");
  };

  return (
    <div className="bg-white rounded-xl p-6 md:p-10 flex-1 flex flex-col justify-between">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-dark-grey mb-2">
          Customize your links
        </h1>
        <p className="text-grey text-base mb-10">
          Add/edit/remove links below and then share all your profiles with the
          world!
        </p>

        <button
          type="button"
          onClick={() => append({ platform: "GitHub", url: "" })}
          className="w-full border border-purple text-purple hover:bg-light-purple font-semibold py-3 rounded-lg mb-6 transition-colors"
        >
          + Add new link
        </button>

        <form
          id="links-form"
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >
          {fields.length === 0 ? (
            <div className="bg-light-grey rounded-xl p-8 text-center flex flex-col items-center justify-center">
              <img
                src="/assets/images/illustration-empty.svg"
                alt="Empty"
                className="w-32 md:w-60 mb-6"
              />
              <h2 className="text-2xl md:text-3xl font-bold text-dark-grey mb-6">
                Let’s get you started
              </h2>
              <p className="text-grey text-base max-w-[488px]">
                Use the “Add new link” button to get started. Once you have more
                than one link, you can reorder and edit them.
              </p>
            </div>
          ) : (
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="links-list">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="space-y-6 max-h-[460px] overflow-y-auto pr-2"
                  >
                    {fields.map((field, index) => (
                      <Draggable
                        key={field.id}
                        draggableId={field.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className="bg-light-grey p-5 rounded-xl space-y-3"
                          >
                            <div className="flex items-center justify-between text-grey font-bold">
                              <div
                                {...provided.dragHandleProps}
                                className="flex items-center gap-2 cursor-grab active:cursor-grabbing"
                              >
                                <img
                                  src="/assets/images/icon-drag-and-drop.svg"
                                  alt="drag"
                                  className="w-3 h-3"
                                />
                                <span>Link #{index + 1}</span>
                              </div>
                              <button
                                type="button"
                                onClick={() => remove(index)}
                                className="text-grey hover:text-red font-normal transition-colors"
                              >
                                Remove
                              </button>
                            </div>

                            <div>
                              <label className="block text-xs text-dark-grey mb-1">
                                Platform
                              </label>
                              <select
                                {...register(`links.${index}.platform`)}
                                className="w-full py-3 px-4 rounded-lg border border-borders bg-white text-dark-grey outline-none focus:border-purple"
                              >
                                {PLATFORMS.map((plat) => (
                                  <option key={plat} value={plat}>
                                    {plat}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div>
                              <label className="block text-xs text-dark-grey mb-1">
                                Link
                              </label>
                              <div className="relative">
                                <img
                                  src="/assets/images/icon-link.svg"
                                  alt="link"
                                  className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4"
                                />
                                <input
                                  type="url"
                                  placeholder="e.g. https://www.github.com/johnappleseed"
                                  {...register(`links.${index}.url`, {
                                    required: "Can't be empty",
                                    pattern: {
                                      value:
                                        /^(https?:\/\/)?([\w\d]+\.)+[\w\d]+(\/.*)?$/,
                                      message: "Please check the URL",
                                    },
                                  })}
                                  className={`w-full pl-11 pr-32 py-3 rounded-lg border text-dark-grey text-base outline-none bg-white focus:border-purple ${
                                    errors.links?.[index]?.url
                                      ? "border-red"
                                      : "border-borders"
                                  }`}
                                />
                                {errors.links?.[index]?.url && (
                                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-red">
                                    {errors.links[index].url.message}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          )}
        </form>
      </div>

      <div className="border-t border-borders pt-6 mt-6 flex justify-end">
        <button
          type="submit"
          form="links-form"
          className="w-full md:w-auto bg-purple hover:bg-purple-hover text-white font-semibold px-7 py-3 rounded-lg transition-colors"
        >
          Save
        </button>
      </div>
    </div>
  );
}
