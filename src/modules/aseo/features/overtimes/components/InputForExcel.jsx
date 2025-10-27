import { Controller } from "react-hook-form"

export const InputForExcel = ({
  as: Component = 'input',
  type = 'file',
  label,
  name,
  control,
  rules,
  classNameLabel = 'flex flex-col',
  classNameSpan = 'text-epaColor1 font-semibold',
  classNameComponent = 'border border-gray-500 rounded-md p-1',
  errors,
  controllerProps = {},
  fileInputRef,
  ...props
}) => {  
  return (
    <label className={classNameLabel}>
      <span className={classNameSpan}>{label}</span>
      <Controller
        name={name}
        control={control}
        rules={rules}
        { ...controllerProps }
        render={({ field }) => (
          <Component
            {...field}
            type={type}
            className={classNameComponent}
            {...props}
            ref={(el) => {
              field.ref(el);
              if (fileInputRef) fileInputRef.current = el;
            }}
            onChange={(e) => {
              field.onChange(e);
              props.onChange?.(e);
            }}
          />
        )}
      />
      {errors?.[name] && (
        <p className="text-red-500 text-sm">{errors[name].message}</p>
      )}
    </label>
  )
}