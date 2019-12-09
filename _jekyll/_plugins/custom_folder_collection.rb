Jekyll::Collection.class_eval do
  def relative_directory
    @relative_directory ||= metadata.fetch("relative_directory", "_#{label}")
  end
end
