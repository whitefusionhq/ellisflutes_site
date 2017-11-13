module Jekyll
  module CloudinaryFilter
    def cloudinary_url(input, attr_string="", image_format='jpg')
      puts ENV.inspect

      cloudinary_url = Cloudinary::Utils.cloudinary_url(input, {format: image_format})
      if attr_string.present?
        cloudinary_url.sub!("/image/upload", "/image/upload/#{attr_string}")
      end
      cloudinary_url
    end
  end
end

###############################
# THIS ISN'T ACTUALLY TRUE!!!!!
# ########################################
# API Key and Secret are set via ENV vars:
# CLOUDINARY_API_KEY
# CLOUDINARY_API_SECRET
########################
Cloudinary.config({
  "cloud_name" => 'mariposta',
  "secure" => true
})

Liquid::Template.register_filter(Jekyll::CloudinaryFilter)
