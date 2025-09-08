import Card from "../Elements/Card";
import Button from "../Elements/Button";

const FormLayout = ({
  title,
  children,
  onSubmit,
  onCancel,
  submitText = "Submit",
  cancelText = "Cancel",
  showCancelButton = true,
  isSubmitting = false,
  className = "",
  ...props
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(e);
    }
  };

  return (
    <Card
      heading={title}
      variant="outline"
      padding="lg"
      rounded="default"
      className={className}
      {...props}
    >
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>{children}</div>

        <div className={"flex gap-3 justify-end pt-4"}>
          {showCancelButton && (
            <Button
              type="button"
              variant="outline"
              color="secondary"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              {cancelText}
            </Button>
          )}
          <Button
            type="submit"
            variant="solid"
            color="primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Loading..." : submitText}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default FormLayout;
