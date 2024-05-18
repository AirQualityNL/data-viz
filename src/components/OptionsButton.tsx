interface OptionButtonProp {
  id: string;
  display_name: string;
  get: boolean;
  set: any;
}

export const OptionsButton = ({
  id,
  display_name,
  get,
  set,
}: OptionButtonProp) => {
  return (
    <div className="flex align-middle items-center">
      <label htmlFor={id} className="mr-2">
        {display_name}
      </label>
      <input
        type="checkbox"
        id={id}
        name={display_name}
        onChange={() => set(!get)}
        className="form-checkbox h-5 w-5 text-blue-600"
      />
    </div>
  );
};
